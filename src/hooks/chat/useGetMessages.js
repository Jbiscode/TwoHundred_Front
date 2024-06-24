import { useEffect, useState } from "react";
import conversationStore from "@zustand/conversationStore";
import toast from "react-hot-toast";
import { useAuthStore } from '@zustand/authStore';

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = conversationStore();
  const {token, id, refreshToken} = useAuthStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/socket/messages/get/${selectedConversation}/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
        );
        
        if(response.status === 401){
          setMessages([]);
          refreshToken();
          toast.error("로그인이 필요합니다.");
        }
        if(response.status === 403){
          setMessages([]);
          toast.error("권한이 없습니다.");
        }

        const data = await response.json();
        if(data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        console.log("에러발생",error);
        toast.error(error.message + " 대화방을 선택해주세요.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) {
      getMessages();
    }
  }, [selectedConversation, setMessages, token,id]);

  return { loading, messages };
}

export default useGetMessages;
