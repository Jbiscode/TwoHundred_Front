import {useParams} from "react-router-dom";

const ChatRoomComponent = () => {

    const {rid} = useParams();

    const chatRoomData = {
        id: Number(rid),
        name: '황금효정',
        lastMessage: '팝니다ㄴㅌㅌ',
        timestamp: '1시간 전',
        location: '관악구 봉천동',
        productImage: 'https://picsum.photos/200',
        profileImage: 'https://picsum.photos/100',
        productDescription: '신발 수선(슈박스), 화정동 수선 + 직제 가능 1,000원',
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={chatRoomData.profileImage} alt="Avatar"/>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{chatRoomData.name}</h3>
                            <p className="text-gray-500">{chatRoomData.productDescription}</p>
                        </div>
                    </div>
                </div>
                <hr className="border-2"/>
                <div className="flex-1 p-4 overflow-y-auto">
                    {/* 채팅 내역 */}
                    <div className="flex flex-col space-y-4">
                        {/* 예시로 몇 개의 채팅 메시지를 추가합니다. */}
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <p>안녕하세요, 상품에 대해 문의 드립니다.</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-orange-400 text-white p-2 rounded-lg">
                                <p>안녕하세요, 어떤 점이 궁금하신가요?</p>
                            </div>
                        </div>
                        {/* ... */}
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 sticky bottom-[45.45px] bg-white">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요"
                        className="input input-bordered flex-1"
                    />
                    <button className="btn btn-ghost bg-orange-400 text-white">전송</button>
                </div>
            </div>
        </>
    );
};

export default ChatRoomComponent;