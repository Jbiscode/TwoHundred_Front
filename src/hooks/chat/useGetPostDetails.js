import { useEffect,useState } from "react";
import conversationStore from "@zustand/conversationStore";
import {auth} from "@api/index.js";
import useAuthStore from "@zustand/authStore";

function useGetPostDetails() {
  const [loading, setLoading] = useState(false);
  const { postDetails, setPostDetails, selectedConversation } = conversationStore();
  const { token } = useAuthStore();

  useEffect(() => {
    const getPostDetails = async () => {
      setLoading(true);
      try {
        const response = await auth.get(`/api/v1/chatroom/${selectedConversation}`,{
          withCredentials: true,
          headers: {
            "Authorization": `${token}`,
          },
        });
        // if(data.error) throw new Error(data.error);

        setPostDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) {
      getPostDetails();
    }
  }, [selectedConversation, setPostDetails]);


  return { loading, postDetails, selectedConversation };
}

export default useGetPostDetails;