import { useEffect, useState } from "react";
import conversationStore from "@zustand/conversationStore";
import toast from "react-hot-toast";
import { useAuthStore } from '@zustand/authStore';

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = conversationStore();
  const {token} = useAuthStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/socket/messages/get/${selectedConversation}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
        );
        const data = await response.json();
        if(data.error) throw new Error(data.error);
        console.log("데이터",data);

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
  }, [selectedConversation, setMessages]);

  return { loading, messages };
}

export default useGetMessages;
