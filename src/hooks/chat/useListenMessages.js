import { useEffect } from "react";
import useSocketStore from "@zustand/useSocketStore";
import conversationStore from "@zustand/conversationStore";

const useListenMessages = () => {
  const { socket } = useSocketStore();
  const { messages, setMessages } = conversationStore();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.Shakeit = true; // 새로운 메시지가 왔을 때 흔들림 효과를 주기 위해 Shakeit 프로퍼티를 추가
      setMessages([...messages, newMessage]);
    });

    // 마운트 해제 시 리스너 제거 그래야만 채팅을 나갔을때 메시지를 받지 않음
    return () => {
      socket?.off("newMessage"); 
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
