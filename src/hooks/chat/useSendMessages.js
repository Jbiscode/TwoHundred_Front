import { useState } from "react";
import toast from "react-hot-toast";
import conversationStore from "@zustand/conversationStore";
import { useAuthStore } from '../../zustand/authStore';

const useSendMessages = () => {
  const {token,id} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = conversationStore()
  const sendMessage = async (inputs) => {
    setLoading(true);
    try {
      const response = await fetch(`/socket/messages/send/${selectedConversation}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({message:inputs}),
      });
      const data = await response.json();
      setMessages([...messages, data]); // 여기서 data를 입력해야하는데 data.message로 입력해서 오류가 발생했었다.

      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessages;