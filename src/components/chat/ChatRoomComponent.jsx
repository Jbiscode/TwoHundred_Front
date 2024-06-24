import { Link, useParams } from "react-router-dom";
import ChatMessageInput from "@components/chat/ChatMessageInput";
import ChatMessages from "./ChatMessages";
import { useEffect } from 'react';
import conversationStore from "@zustand/conversationStore";
import useGetPostDetails from "../../hooks/chat/useGetPostDetails";
import useAuthStore from "@zustand/authStore";

const ChatRoomComponent = () => {
    const { setSelectedConversation } = conversationStore();
    const { id } = useAuthStore();
    const { postDetails }=useGetPostDetails();
    const { rid } = useParams();

    useEffect(() => {
        setSelectedConversation(rid);
    }, [setSelectedConversation,rid]);

    // const postDetails = {
    //     id: Number(rid),
    //     writerName: "황금효정",
    //     lastMessage: "팝니다ㄴㅌㅌ",
    //     timestamp: "1시간 전",
    //     location: "관악구 봉천동",
    //     productImage: "https://picsum.photos/200",
    //     writerProfileImageUrl: "https://picsum.photos/100",
    //     content: "신발 수선(슈박스), 화정동 수선 + 직제 가능 1,000원",
    // };

    return (
        <>
        <Link to={`/post/${postDetails.articleId}`} className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-16 bg-white z-10">
            <div className="flex items-center space-x-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                    <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${postDetails.writerProfileImageUrl}`} alt="Avatar" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{postDetails.writerName}</h3>
                    <p className="text-gray-500">{postDetails.title}</p>
                </div>

            </div>
            <div className="pl-28">
                <img className="w-20 h-20 object-cover" src={`https://kr.object.ncloudstorage.com/kjwtest/article/${postDetails.productImageUrl}`} alt="" />
            </div>
        </Link>
        <hr className="border-2 sticky top-44 w-full z-10" />
        <div className="flex flex-col h-[calc(100vh-10rem)]">
            <ChatMessages oppositeProfile={id == postDetails.userId ? postDetails.writerProfileImageUrl : postDetails.offerProfileImageUrl}/>
        </div>
        <ChatMessageInput />
        </>
    );
};

export default ChatRoomComponent;
