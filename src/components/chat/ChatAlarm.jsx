import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatAlarm = ({ t, newMessage }) => {
  const navigate = useNavigate();

  const handleLinkClick = (event) => {
    event.preventDefault();
    toast.dismiss(t.id);
    setTimeout(() => {
      navigate("/chat");
    }, 1000);
  };
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-slate-200 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <button to="/chat" onClick={handleLinkClick} className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            {/* <p className="text-sm font-medium text-gray-900">Emilia Gates</p> */}
            <p className="mt-1 text-sm text-gray-500" 
                style={{
                  display: '-webkit-box', 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden', 
                  WebkitLineClamp: 2,
                  whiteSpace:"pre-wrap"}}
                  >{newMessage.message}
            </p>
          </div>
        </div>
      </button>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatAlarm;
