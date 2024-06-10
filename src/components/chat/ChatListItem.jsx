import conversationStore from "@zustand/conversationStore";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";

const ChatListItem = ({ chat, user, lastMessage, unreadCount }) => {
  const { setSelectedConversation } = conversationStore();

  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    setSelectedConversation(chatId);
    navigate(`/chat/room/${chatId}`);
  };

  return (
    <li
      key={chat.id}
      className="flex space-x-4 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 items-center"
      onClick={() => handleChatClick(chat.id)}>
      <div className="flex-shrink-0">
        <img
          src={chat.profileImage}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {user == chat.user_name ? chat.writer_name : chat.user_name} 
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h3>
          <div className="text-sm text-gray-400 ml-2">
            {chat.addr1} {chat.addr2} · {formatDistanceToNow(new Date(chat.modified_date), { addSuffix: true, locale: ko })}
          </div>
        </div>
        <p className="text-gray-500">{lastMessage}</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <img
          src={`https://kr.object.ncloudstorage.com/kjwtest/article/${chat.thumbnail_url}`}
          alt="Product"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>
    </li>
  );
};

export default ChatListItem;