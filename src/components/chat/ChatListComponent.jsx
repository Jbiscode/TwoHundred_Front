import {useNavigate} from "react-router-dom";

const ChatListComponent = () => {

    const userName = 'Bid&Buy';

    const chatList = [
        {
            id: 1,
            name: '황금효정',
            lastMessage: '팔렸나요?',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 2,
            name: '황금효정',
            lastMessage: '제가 살게요',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 3,
            name: '황금효정',
            lastMessage: '이거 혹시..',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 4,
            name: '황금효정',
            lastMessage: '직거래 되나요?',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 5,
            name: '황금효정',
            lastMessage: '팝니다ㄴㅌㅌ',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 6,
            name: '황금효정',
            lastMessage: '팝니다ㄴㅌㅌ',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 7,
            name: '황금효정',
            lastMessage: '팝니다ㄴㅌㅌ',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 8,
            name: '황금효정',
            lastMessage: '팝니다ㄴㅌㅌ',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 9,
            name: '황금효정',
            lastMessage: '팝니다ㄴㅌㅌ',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        {
            id: 10,
            name: '황금효정',
            lastMessage: '팝니다ㄴㅌㅌ',
            timestamp: '1시간 전',
            location: "관악구 봉천동",
            productImage: "https://picsum.photos/200",
            profileImage: "https://picsum.photos/100"
        },
        // ... more chat items
    ];

    const navigate = useNavigate();

    const handleChatClick = (chatId) => {
        navigate(`/chat/room/${chatId}`);
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">{userName}님의 채팅 목록</h2>
                <hr className="border-1 mb-4 border-orange-400"/>
            </div>
            <div className="flex-1  overflow-y-auto">
                <ul className="space-y-4 p-4">
                    {chatList.map((chat) => (
                        <li key={chat.id}
                            className="flex space-x-4 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 items-center"
                            onClick={() => handleChatClick(chat.id)}
                        >
                            <div className="flex-shrink-0">
                                <img src={chat.profileImage} alt="Profile" className="w-12 h-12 rounded-full"/>
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">{chat.name}</h3>
                                    <div className="text-sm text-gray-400 ml-2">
                                        {chat.location} · {chat.timestamp}
                                    </div>
                                </div>
                                <p className="text-gray-500">{chat.lastMessage}</p>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                                <img src={chat.productImage} alt="Product"
                                     className="w-20 h-20 object-cover rounded-lg"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatListComponent;