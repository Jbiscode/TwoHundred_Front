import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import authStore from '@zustand/authStore';

const useGetConversations = () => {
  const { token } = authStore();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/socket/chatrooms`
        ,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });
        const data = await response.json();  
        console.log(data);
        if(data.length > 0){
          setConversations(data);
        } else {
          throw new Error("대화방이 없습니다.");
        }

      } catch (error) {
        toast.error(error.message); 
      } finally {
        setLoading(false);
      }
      
    };
    getConversation();
  },[token]);

  return { loading, conversations };
};

export default useGetConversations;
