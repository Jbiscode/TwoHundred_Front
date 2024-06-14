import { useEffect, useState } from "react";
import conversationStore from "@zustand/conversationStore";
import toast from "react-hot-toast";
import { useAuthStore } from '@zustand/authStore';
import useSocketStore from '@zustand/useSocketStore';

const useGetLastMessageAndUnread = (conversations) => {
  const {socket} = useSocketStore();
  const {newMessage, setNewMessage} = conversationStore();
  const [loading, setLoading] = useState(false);
  const { setLastMessage, setUnreadCount, setModifiedDate, lastMessage, unreadCount, modifiedDate } = conversationStore();
  const { token, id } = useAuthStore();

  useEffect(() => {
    socket?.on("newMessage", () => {
      setNewMessage();
    });
    const getLastMessageAndUnread = async () => {
      setLoading(true);
      try {
        const fetchPromises = conversations.map(async (conversation) => {
          const response = await fetch(`/socket/messages/lastAndUnread/${conversation.id}/${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          });

          if (response.status === 401) {
            toast.error("로그인이 필요합니다.");
            return null;
          }
          if (response.status === 403) {
            toast.error("권한이 없습니다.");
            return null;
          }

          const data = await response.json();
          if (data.error) throw new Error(data.error);

          return { roomId: conversation.id, lastMessage: data.lastMessage, unreadCount: data.unreadCount, modifiedDate: data.modifiedDate };
        });

        const results = await Promise.all(fetchPromises);

        const validResults = results.filter(result => result !== null);
        validResults.forEach(result => {
          setLastMessage(result.roomId, result.lastMessage);
          setUnreadCount(result.roomId, result.unreadCount);
          setModifiedDate(result.roomId, result.modifiedDate);
        });
      } catch (error) {
        toast.error(error.message + " 대화방을 선택해주세요.");
      } finally {
        setLoading(false);
      }
    };

    if (conversations.length > 0 && id) {
      getLastMessageAndUnread();
    }
    return () => {
      socket?.off("newMessage");
    };
  }, [conversations, id, token, newMessage]);

  return { loading, lastMessage, unreadCount, modifiedDate };
};

export default useGetLastMessageAndUnread;
