import { useRef, useEffect } from "react";
import useGetMessages from "@hooks/chat/useGetMessages.js";
import ChatMessage from "@components/chat/ChatMessage";
import ChatSkeleton from "@components/chat/ChatSkeleton";
import useListenMessages from '@hooks/chat/useListenMessages';

const ChatMessages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();
  // 메시지를 실시간으로 받아오기 위한 커스텀 훅
  useListenMessages();

  useEffect(() => {
    // setTimeout이 없으면 메시지가 렌더링되기 전에 scrollIntoView가 실행되어 제대로 작동하지 않음
    setTimeout(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);


//   const testMessages = [{
//     _id: 1,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
//   {
//     _id: 2,
//     message: "안녕하세요",
//     sender: 1,
//     createdAt: new Date(),
//   },
//   {
//     _id: 3,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
//   {
//     _id: 4,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 1,
//     createdAt: new Date(),
//   },
//   {
//     _id: 5,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
//   {
//     _id: 6,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 1,
//     createdAt: new Date(),
//   },
//   {
//     _id: 7,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
//   {
//     _id: 8,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 1,
//     createdAt: new Date(),
//   },
//   {
//     _id: 9,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
//   {
//     _id: 10,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 1,
//     createdAt: new Date(),
//   },
//   {
//     _id: 11,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
//   {
//     _id: 12,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 1,
//     createdAt: new Date(),
//   },
//   {
//     _id: 13,
//     message: "안녕하세요, 상품에 대해 문의 드립니다.",
//     sender: 10,
//     createdAt: new Date(),
//   },
// ]

  return (
    <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4">
      {loading && [...Array(3)].map((_, idx) => <ChatSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">메시지를 작성해 대화를 시작해보세요!</p>
      )}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <ChatMessage message={message} />
            </div>
        ))}
        </div>
    </div>
  );
};
export default ChatMessages;