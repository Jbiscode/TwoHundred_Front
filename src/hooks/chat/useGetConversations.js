import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import authStore from '@zustand/authStore';

const useGetConversations = () => {
  const { token, refreshToken, isLoggedin } = authStore();
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
        if(response.status === 401){
          refreshToken();
        }
          const data = await response.json();  
        if(data.length > 0){
          setConversations(data);
        } else if(isLoggedin && data.length === 0){
          setConversations([]);
        }else if(!isLoggedin){
          setConversations([]);
          throw new Error("채팅방은 로그인이 필요합니다.");
        }

      } catch (error) {
        toast.error(error.message); 
      } finally {
        setLoading(false);
      }
      
    };
    if(isLoggedin){
    getConversation();
    }
  },[token ,isLoggedin]);

  return { loading, conversations };
};

export default useGetConversations;
