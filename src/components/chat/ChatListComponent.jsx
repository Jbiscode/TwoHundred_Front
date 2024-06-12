import ChatListItem from "@components/chat/ChatListItem";
import authStore from "@zustand/authStore";
import useGetConversations from "@hooks/chat/useGetConversations";
import useGetLastMessageAndUnread from "@hooks/chat/useGetLastMessageAndUnread";


const ChatListComponent = () => {
    const { user } = authStore();
    const { loading, conversations } = useGetConversations();
    const { lastMessage, unreadCount, modifiedDate } = useGetLastMessageAndUnread(conversations);


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
                            lastMessage={lastMessage[chat.id]}
                            unreadCount={unreadCount[chat.id]}
                            modifiedDate={modifiedDate[chat.id]}
                        />
                    ))
                )}
                </ul>
            </div>
        </div>
    );
};

export default ChatListComponent;