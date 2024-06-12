import { useState } from "react";
import { BsSend } from "react-icons/bs"
import useSendMessages from "@hooks/chat/useSendMessages";

const ChatMessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div className="p-4 border-t border-gray-200 fixed bottom-[45.45px] bg-white w-full">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          className="input input-bordered flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn btn-ghost bg-orange-400 text-white"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatMessageInput;
