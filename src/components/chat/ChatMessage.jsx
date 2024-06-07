import useAuthStore from "@zustand/authStore";
// import conversationStore from "../../zustand/conversationStore";
import { extractTime } from "@utils/extractTime";

const ChatMessage = ({ message }) => {
  const {id} = useAuthStore();
  // const {selectedConversation} = conversationStore();
  const FormmattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleClassName = fromMe ? "bg-blue-500" : "";
  const ShakeClass = message.Shakeit ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            }
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleClassName} ${ShakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {FormmattedTime}
      </div>
    </div>
  );
};

export default ChatMessage;