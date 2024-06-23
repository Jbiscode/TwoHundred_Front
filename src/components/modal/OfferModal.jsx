import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "@zustand/authStore.js";
import useModalStore from "@zustand/modalStore.js";
import { auth } from "@api/index.js";

const OfferModal = () => {
    const [offerPrice, setOfferPrice] = useState("");
    const { id, token } = useAuthStore();
    const { closeOfferModal, selectedArticleId } = useModalStore(
        (state) => state
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(offerPrice);
        // console.log(selectedArticleId);

        try {
            const response = await auth.post(
                `/api/v1/offers/${selectedArticleId}`,
                {
                    withCredentials: true,
                    body: JSON.stringify({
                        price: parseInt(offerPrice.replace(/,/g, "")),
                    }),
                }
            );

            if (response.resultCode === "201") {
                console.log("가격 제안이 성공적으로 생성되었습니다.");
                try{
                    const {articleId, userId} = {articleId: selectedArticleId, userId: id}
                    const getRoomId = await auth.post(`/api/v1/chatroom/enter`, {
                        body: JSON.stringify({ articleId, userId }),
                        withCredentials: true,
                    });

                    await fetch(`/socket/messages/send/${getRoomId.data.chatRoomId}/${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                        },
                        body: JSON.stringify({message: "🔥 새로운 가격제안이 도착했습니다 !\n" + offerPrice + " 원은 어떠신가요?!"}),
                        });
                }catch(error){
                    console.error(error);
                }
                closeOfferModal();
                // location.href = `/post/${selectedArticleId}`;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setOfferPrice(formattedValue);
    };

    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <p className="text-2xl mb-2">가격을 제시해 볼까요?</p>
                <p className="text-base text-gray-400 font-medium">
                    당신의 제안이 마음에 든다면, 연락이 올 거에요!
                </p>
            </div>
            <div className="p-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-6 flex justify-center items-center gap-4">
                            <p className="font-bold text-lg pl-1">제안가격</p>
                            <div>
                                <input
                                    type="text"
                                    placeholder="ex) 99,999"
                                    className="input input-bordered w-full"
                                    value={offerPrice}
                                    onChange={handlePriceChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-3/5 text-lg mb-3 font-bold"
                        >
                            제안하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OfferModal;
