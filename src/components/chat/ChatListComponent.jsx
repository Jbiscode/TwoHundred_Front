import ChatListItem from "@components/chat/ChatListItem";
import authStore from "@zustand/authStore";
import useGetConversations from "@hooks/chat/useGetConversations";

const ChatListComponent = () => {
    const { user } = authStore();
    const { loading, conversations } = useGetConversations();


    // const chatList = [
    //     {
    //         id: 1,
    //         name: '황금효정',
    //         lastMessage: '팔렸나요?',
    //         timestamp: '1시간 전',
    //         location: "관악구 봉천동",
    //         productImage: "https://picsum.photos/200",
    //         profileImage: "https://picsum.photos/100"
    //     },
    // ];



    return (
        <div className="flex flex-col">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">{user}님의 채팅 목록</h2>
                <hr className="border-1 mb-4 border-orange-400"/>
            </div>
            <div className="flex-1">
                <ul className="space-y-4 p-4">
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (    
                    conversations.map((chat) => (
                        <ChatListItem 
                            key={chat.id} 
                            chat={chat} 
                            user={user}
                        />
                    ))
                )}
                </ul>
            </div>
        </div>
    );
};

export default ChatListComponent;