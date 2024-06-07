import { useParams } from "react-router-dom";
import ChatMessageInput from "@components/chat/ChatMessageInput";
import ChatMessages from "./ChatMessages";
import { useEffect } from 'react';
import conversationStore from "@zustand/conversationStore";

const ChatRoomComponent = () => {
    const {setSelectedConversation} = conversationStore();
    const { rid } = useParams();

    useEffect(() => {
        setSelectedConversation(rid);
    }, [setSelectedConversation,rid]);

    const chatRoomData = {
        id: Number(rid),
        name: "황금효정",
        lastMessage: "팝니다ㄴㅌㅌ",
        timestamp: "1시간 전",
        location: "관악구 봉천동",
        productImage: "https://picsum.photos/200",
        profileImage: "https://picsum.photos/100",
        productDescription: "신발 수선(슈박스), 화정동 수선 + 직제 가능 1,000원",
    };

    return (
        <>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-16 bg-white z-10">
            <div className="flex items-center space-x-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                    <img src={chatRoomData.profileImage} alt="Avatar" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{chatRoomData.name}</h3>
                    <p className="text-gray-500">{chatRoomData.productDescription}</p>
                </div>
            </div>
        </div>
        <hr className="border-2 sticky top-36 w-full z-10" />
        <div className="flex flex-col h-[calc(100vh-10rem)]">
            <ChatMessages />
        </div>
        <ChatMessageInput />
        </>
    );
};

export default ChatRoomComponent;
