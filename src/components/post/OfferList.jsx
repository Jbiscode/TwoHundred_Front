import React from "react";
import { auth } from "@api/index.js";
import toast, { Toaster } from "react-hot-toast";
import useModalStore from "@zustand/modalStore";

function OfferList({ article, loggedInUserId, setArticle }) {
    const { setOfferReload } = useModalStore((state) => state);

    const handleAcceptOffer = async (offerId) => {
        if (article.tradeStatus === "SOLD_OUT") {
            toast.error("거래 완료된 상품은 제안을 수락할 수 없습니다.");
            return;
        } else if (article.offers.some((offer) => offer.selected)) {
            toast.error("이미 수락된 제안이 있습니다.");
            return;
        } else {
            try {
                const response = await auth.put(
                    `/api/v1/offers/${article.id}/${offerId}`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.resultCode === "200") {
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        offers: prevArticle.offers.map((offer) =>
                            offer.id === offerId
                                ? { ...offer, selected: true }
                                : offer
                        ),
                    }));
                    toast.success("제안을 수락했습니다.");
                    setOfferReload();
                }
                if (response.resultCode == "500") {
                    toast.error("존재하지 않는 제안입니다.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancelAcceptedOffer = async (offerId) => {
        try {
            if (article.tradeStatus === "SOLD_OUT") {
                toast.error(
                    "거래 완료된 상품은 제안 수락을 취소할 수 없습니다."
                );
                return;
            } else {
                const response = await auth.put(
                    `/api/v1/offers/${article.id}/${offerId}/cancel`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.resultCode === "200") {
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        offers: prevArticle.offers.map((offer) =>
                            offer.id === offerId
                                ? { ...offer, selected: false }
                                : offer
                        ),
                    }));
                    toast.success("제안 수락을 취소했습니다.");
                    setOfferReload();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelOffer = async (offerId) => {
        try {
            if (article.tradeStatus === "SOLD_OUT") {
                toast.error("거래 완료된 상품은 제안을 취소할 수 없습니다.");
                return;
            } else if (article.tradeStatus === "RESERVED") {
                toast.error("예약된 상품은 제안을 취소할 수 없습니다.");
                return;
            } else {
                const response = await auth.delete(
                    `/api/v1/offers/${offerId}`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.resultCode === "200") {
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        offers: prevArticle.offers.filter(
                            (offer) => offer.id !== offerId
                        ),
                    }));
                    toast.success("제안을 취소했습니다.");
                    setOfferReload();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    function timeAgo(dateParam) {
        const date =
            typeof dateParam === "object" ? dateParam : new Date(dateParam);
        const now = new Date();
        const secondsPast = (now.getTime() - date.getTime()) / 1000;

        if (secondsPast < 60) {
            return parseInt(secondsPast) + "초 전";
        }
        if (secondsPast < 3600) {
            return parseInt(secondsPast / 60) + "분 전";
        }
        if (secondsPast <= 86400) {
            return parseInt(secondsPast / 3600) + "시간 전";
        }
        if (secondsPast > 86400) {
            const day = parseInt(secondsPast / 86400);
            return day + "일 전";
        }
    }

    return (
        <div className="w-[300px]">
            <h1 className="text-4xl text-black md:mt-10 mb-4">가격 제안</h1>
            <hr className="border-2 border-black" />
            {article.offers.length === 0 ? (
                <p className="text-red-600 decoration-gray-600 underline decoration-2 decoration-wavy underline-offset-4 mt-4 font-bold text-xl text-center">
                    첫 번째 제안을 해보세요!
                </p>
            ) : (
                <ul className="space-y-2 mt-4 mb-10">
                    {article.offers.map((offer) => (
                        <li
                            key={offer.id}
                            className="flex justify-between items-center"
                        >
                            <div>
                                <p className="text-black">
                                    {offer.offererUsername}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {timeAgo(offer.createdDate)}
                                </p>
                            </div>
                            <div className="flex place-items-center">
                                <p className="text-black">
                                    {offer.offerPrice.toLocaleString("ko-KR")}원
                                </p>
                                {loggedInUserId === article.writerId &&
                                    !offer.selected && (
                                        <button
                                            className="btn btn-ghost text-white bg-violet-500 ml-2"
                                            onClick={() =>
                                                handleAcceptOffer(offer.id)
                                            }
                                        >
                                            수락
                                        </button>
                                    )}
                                {loggedInUserId === article.writerId &&
                                    offer.selected && (
                                        <button
                                            className="btn btn-ghost text-white bg-orange-500 ml-2"
                                            onClick={() =>
                                                handleCancelAcceptedOffer(
                                                    offer.id
                                                )
                                            }
                                        >
                                            취소
                                        </button>
                                    )}
                                {loggedInUserId === offer.offererId &&
                                    !offer.selected && (
                                        <span
                                            className=" text-red-500 ml-3 mr-2.5"
                                            onClick={() =>
                                                handleCancelOffer(offer.id)
                                            }
                                        >
                                            취소
                                        </span>
                                    )}
                                {loggedInUserId === offer.offererId &&
                                    offer.selected && (
                                        <span className="text-green-500 ml-2">
                                            채택됨
                                        </span>
                                    )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default OfferList;
