import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@zustand/authStore.js";
import { instance } from "@api/index.js";
import useModalStore from "@zustand/modalStore.js";

import PostButton from "@components/post/PostButton.jsx";
import { Link } from "react-router-dom";
import { auth } from "@api/index.js";

function ReadComponent({ aid }) {
    const tradeMethodMap = {
        FACE_TO_FACE: "직거래",
        DELIVERY: "택배거래",
        NO_MATTER: "상관없음",
    };

    const initState = {
        thumbnailUrl: "",
        writerProfileImageUrl: "",
        writerUsername: "",
        title: "",
        content: "",
        price: 0,
        addr1: "",
        addr2: "",
        tradeMethod: "",
        createdDate: "",
        offers: [],
        imageUrls: [],
        writerId: "",
    };

    const isLoggedIn = useAuthStore((state) => state);
    const loggedInUserId = useAuthStore((state) => state.getId());
    const { openOfferModal, closeOfferModal, selectedArticleId } =
        useModalStore((state) => state);
    const { openLoginModal, closeLoginModal } = useModalStore((state) => state);
    const { setSelectedArticleId } = useModalStore((state) => state);

    const [article, setArticle] = useState(initState);
    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLike = async () => {
        if (!loggedInUserId) {
            console.log("로그인이 필요합니다.");
            openLoginModal();
        } else {
            try {
                const response = await auth.post(
                    `/api/v1/articles/${aid}/like`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.resultCode === "200") {
                    setLiked(!liked); // isLiked 대신 liked 사용
                    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await auth.get(`/api/v1/articles/${aid}`, {
                    withCredentials: true,
                });

                if (response.resultCode === "200") {
                    setArticle(response.data);
                    console.log(response.data);
                    setLiked(response.data.liked); // isLiked 대신 liked 사용
                    console.log(response.data.liked);
                    setLikeCount(response.data.likeCount);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [aid, isLoggedIn]);

    //게시글 삭제
    const handleDelete = async () => {
        try {
            const response = await auth.delete(`/api/v1/articles/${aid}`, {
                withCredentials: true,
            });
            if (response.resultCode === "200") {
                console.log("게시글 삭제 성공");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAcceptOffer = async (offerId) => {
        try {
            const response = await auth.put(
                `/api/v1/offers/${aid}/${offerId}`,
                {
                    withCredentials: true,
                }
            );
            if (response.resultCode === "200") {
                // 제안 수락 후 상태 업데이트
                setArticle((prevArticle) => ({
                    ...prevArticle,
                    offers: prevArticle.offers.map((offer) =>
                        offer.id === offerId
                            ? { ...offer, selected: true }
                            : offer
                    ),
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelAcceptedOffer = async (offerId) => {
        try {
            const response = await auth.put(
                `/api/v1/offers/${aid}/${offerId}/cancel`,
                {
                    withCredentials: true,
                }
            );
            if (response.resultCode === "200") {
                // 수락한 제안 취소 후 상태 업데이트
                setArticle((prevArticle) => ({
                    ...prevArticle,
                    offers: prevArticle.offers.map((offer) =>
                        offer.id === offerId
                            ? { ...offer, selected: false }
                            : offer
                    ),
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleteSale = async () => {
        try {
            const response = await auth.put(`/api/v1/offers/${aid}/complete`, {
                withCredentials: true,
            });
            if (response.resultCode === "200") {
                // 판매 완료 후 상태 업데이트
                setArticle((prevArticle) => ({
                    ...prevArticle,
                    tradeStatus: "SOLD_OUT",
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelOffer = async (offerId) => {
        try {
            const response = await auth.delete(`/api/v1/offers/${offerId}`, {
                withCredentials: true,
            });
            if (response.resultCode === "200") {
                // 제안 취소 후 상태 업데이트
                setArticle((prevArticle) => ({
                    ...prevArticle,
                    offers: prevArticle.offers.filter(
                        (offer) => offer.id !== offerId
                    ),
                }));
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

    async function navigateToChatRoom(articleId, userId) {
        const response = await auth.post(`/api/v1/chatroom/enter`, {
            body: JSON.stringify({ articleId, userId }),
            withCredentials: true,
        });
        window.scrollTo({ top: 0 });
        navigate(`/chat/room/${response.data.chatRoomId}`);
    }

    return (
        <div className="mx-auto w-fit bg-white py-8 px-6">
            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <div className="flex gap-10 flex-col md:flex-row m-auto md:m-0">
                    <div className="relative">
                        <img
                            src={`https://kr.object.ncloudstorage.com/kjwtest/article/${article.thumbnailUrl}`}
                            alt={"프로필"}
                            className="w-[300px] aspect-square"
                        />
                        <button
                            className={`absolute top-5 right-4 py-1.5 px-2.5 pl-1 pr-2 hover:scale-105 text-center border rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                                liked ? "text-red-500" : "hover:text-gray-400"
                            }`}
                            onClick={handleLike}
                        >
                            <img
                                className="w-6 h-6"
                                src={`/src/assets/images/icon/${
                                    liked ? "heart_fill.svg" : "heart_blank.svg"
                                }`}
                                alt={liked ? "좋아요 취소" : "좋아요"}
                            />
                            <span>{likeCount}</span>
                        </button>
                    </div>
                    <div className="w-[300px]">
                        <div className="flex items-center">
                            <img
                                src={`https://kr.object.ncloudstorage.com/kjwtest/article/${article.writerProfileImageUrl}`}
                                alt="프로필"
                                className="w-[50px] h-[50px] rounded-full mr-4"
                            />
                            <h1 className="text-4xl text-[#EFA43D] mt-5 mb-5">
                                {article.writerUsername}
                            </h1>
                        </div>
                        <hr className="mt-4" />
                        <ul className="space-y-2 mt-4 mb-10">
                            <li>
                                <i className="fas fa-envelope text-gray-400 mr-1"></i>{" "}
                                {article.title}
                            </li>
                            <li>
                                <i className="fas fa-phone text-gray-400 mr-1"></i>
                                {article.price}
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm">
                                    작성 시간 {timeAgo(article.createdDate)}
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm">
                                    거래 지역 {article.addr1} {article.addr2}
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm">
                                    거래 방식{" "}
                                    {tradeMethodMap[article.tradeMethod]}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <div className="flex gap-10 flex-col md:flex-row m-auto md:m-0">
                    <div className="w-[300px]">
                        <h1 className="text-4xl text-black md:mt-10 mb-4">
                            상품 정보
                        </h1>
                        <hr className="border-2 border-black" />
                        <p className="space-y-2 mt-4 mb-10">
                            {article.content}
                        </p>
                        {article.imageUrls.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={`https://kr.object.ncloudstorage.com/kjwtest/article/${imageUrl}`}
                                alt={`이미지 ${index + 1}`}
                                className="w-full mb-4"
                            />
                        ))}
                    </div>
                    <div className="w-[300px]">
                        <h1 className="text-4xl text-black md:mt-10 mb-4">
                            가격 제안
                        </h1>
                        <hr className="border-2 border-black" />
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
                                    <div className="flex items-center">
                                        <p className="text-black">
                                            {offer.offerPrice}원
                                        </p>
                                        {loggedInUserId === article.writerId &&
                                            !offer.selected && (
                                                <PostButton
                                                    className="bg-violet-500 ml-2"
                                                    onClick={() =>
                                                        handleAcceptOffer(
                                                            offer.id
                                                        )
                                                    }
                                                >
                                                    수락
                                                </PostButton>
                                            )}
                                        {loggedInUserId === article.writerId &&
                                            offer.selected && (
                                                <PostButton
                                                    className="bg-orange-500 ml-2"
                                                    onClick={() =>
                                                        handleCancelAcceptedOffer(
                                                            offer.id
                                                        )
                                                    }
                                                >
                                                    취소
                                                </PostButton>
                                            )}
                                        {loggedInUserId === offer.offererId &&
                                            !offer.selected && (
                                                <PostButton
                                                    className="bg-red-500 ml-2"
                                                    onClick={() =>
                                                        handleCancelOffer(
                                                            offer.id
                                                        )
                                                    }
                                                >
                                                    취소
                                                </PostButton>
                                            )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between md:justify-end">
                            {loggedInUserId === article.writerId ? (
                                <>
                                    <PostButton className="bg-violet-500">
                                        <Link to={`/post/modify/${aid}`}>
                                            수정하기
                                        </Link>
                                    </PostButton>
                                    <PostButton
                                        className="bg-orange-500"
                                        onClick={handleDelete}
                                    >
                                        삭제하기
                                    </PostButton>
                                    {article.tradeStatus !== "SOLD_OUT" && (
                                        <PostButton
                                            className="bg-green-500"
                                            onClick={handleCompleteSale}
                                        >
                                            판매 완료
                                        </PostButton>
                                    )}
                                </>
                            ) : (
                                <>
                                    <PostButton
                                        className="bg-violet-500"
                                        onClick={() => {
                                            if (!loggedInUserId) {
                                                openLoginModal();
                                            } else {
                                                navigateToChatRoom(
                                                    aid,
                                                    loggedInUserId
                                                );
                                            }
                                        }}
                                    >
                                        1:1 채팅하기
                                    </PostButton>
                                    <PostButton
                                        className="bg-orange-500"
                                        onClick={() => {
                                            if (!loggedInUserId) {
                                                openLoginModal();
                                            } else {
                                                setSelectedArticleId(aid);
                                                openOfferModal(selectedArticleId);
                                            }
                                        }}
                                    >
                                        거래 제안하기
                                    </PostButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;
