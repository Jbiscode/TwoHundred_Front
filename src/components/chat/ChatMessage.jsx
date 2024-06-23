import useAuthStore from "@zustand/authStore";
// import conversationStore from "../../zustand/conversationStore";
import { extractTime } from "@utils/extractTime";
import { Link } from "react-router-dom";

const ChatMessage = ({ message, oppositeProfile }) => {
  const {id} = useAuthStore();
  // const {selectedConversation} = conversationStore();
  const FormmattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleClassName = fromMe ? "bg-blue-500" : "";
  const ShakeClass = message.Shakeit ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      {!fromMe ? <Link to={`/users/${message.senderId}`} className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              `https://kr.object.ncloudstorage.com/kjwtest/article/${oppositeProfile}`
            }
          />
        </div>
      </Link>: null}
      <div className={`chat-bubble text-white ${bubbleClassName} ${ShakeClass}`} style={{ whiteSpace: 'pre-wrap' }}>
        <span>{message.message}</span>
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {FormmattedTime}
      </div>
    </div>
  );
};

export default ChatMessage;