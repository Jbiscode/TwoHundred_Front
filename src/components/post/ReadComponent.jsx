import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@zustand/authStore.js";
import useModalStore from "@zustand/modalStore.js";

import PostButton from "@components/post/PostButton.jsx";
import { Link } from "react-router-dom";
import { auth } from "@api/index.js";
import toast, { Toaster } from "react-hot-toast";
import HeartBlank from '@assets/images/icon/heart_blank.svg';
import HeartFill from '@assets/images/icon/heart_fill.svg';

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

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? 0 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === article.imageUrls.length - 1
                ? article.imageUrls.length - 1
                : prevIndex + 1
        );
    };

    const handleLike = async () => {
        if (!loggedInUserId) {
            console.log("로그인이 필요합니다.");
            openLoginModal();
        } else if (article.writerId === loggedInUserId) {
            toast.error("본인의 게시글에는 좋아요를 누를 수 없습니다.");
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
                    setLiked(response.data.liked); // isLiked 대신 liked 사용
                    setLikeCount(response.data.likeCount);
                } else if (response.data) {
                    toast.error("해당 게시물을 찾을 수 없습니다.");
                    setTimeout(() => {
                        navigate("/"); // 404 에러 시 메인 페이지로 이동
                    }, 500);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [
        aid,
        isLoggedIn,
        navigate,
        article.offers.filter((offer) => offer.selected).length,
    ]);

    //게시글 삭제
    const handleDelete = async () => {
        try {
            const response = await auth.delete(`/api/v1/articles/${aid}`, {
                withCredentials: true,
            });
            if (response.resultCode === "200") {
                toast.success("게시글이 삭제되었습니다.");
                setTimeout(() => {
                    location.href = "/";
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleteSale = async () => {
        if (article.tradeStatus !== "RESERVED") {
            toast.error("예약된 상품만 판매 완료할 수 있습니다.");
            return;
        } else {
            try {
                const response = await auth.put(
                    `/api/v1/offers/${aid}/complete`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.resultCode === "200") {
                    // 판매 완료 후 상태 업데이트
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        tradeStatus: "SOLD_OUT",
                    }));
                    toast.success("판매가 완료되었습니다.");
                }
            } catch (error) {
                console.error(error);
            }
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
                    // 제안 취소 후 상태 업데이트
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        offers: prevArticle.offers.filter(
                            (offer) => offer.id !== offerId
                        ),
                    }));
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
                        {article.tradeStatus === "SOLD_OUT" && (
                            <div className="text-lg text-white flex justify-center items-center w-full h-full absolute bg-black/30 top-0 rounded-[10%]">
                                거래 완료
                            </div>
                        )}
                        {article.tradeStatus === "RESERVED" && (
                            <div className="text-lg text-white flex justify-center items-center w-full h-full absolute bg-black/30 top-0 rounded-[10%]">
                                예약 중
                            </div>
                        )}
                        <button
                            className={`absolute bg-white top-5 right-4 py-1.5 px-2.5 pl-1 pr-2 hover:scale-105 text-center border rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                                liked ? "text-red-500" : "hover:text-gray-400"
                            }`}
                            onClick={handleLike}
                        >
                            <img
                                className="w-6 h-6"
                                src={liked ? HeartFill : HeartBlank}
                                alt={liked ? "좋아요 취소" : "좋아요"}
                            />
                            <span className="text-black">{likeCount}</span>
                        </button>
                    </div>
                    <div className="w-[300px]">
                        <div className="flex items-center">
                            <img
                                src={`https://kr.object.ncloudstorage.com/kjwtest/article/${article.writerProfileImageUrl}`}
                                alt="프로필"
                                className="w-[50px] h-[50px] rounded-full mr-4"
                            />
                            <h2 className="text-3xl text-[#EFA43D] mt-5 mb-5">
                                {article.writerUsername}
                            </h2>
                        </div>
                        <hr className="mt-4" />
                        <h2 className="text-3xl mt-4 mb-2">{article.title}</h2>
                        <h3 className="text-xl ">
                            {article.price.toLocaleString("ko-KR")}원
                        </h3>
                        <ul className="space-y-2 mt-2 mb-10">
                            <li>
                                <p className="text-gray-400 text-sm mr-1 ml-1">
                                    작성 시간 {timeAgo(article.createdDate)}
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm mr-1 ml-1">
                                    거래 지역 {article.addr1} {article.addr2}
                                </p>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm mr-1 ml-1">
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
                        <div
                            className="relative w-full mb-4"
                            style={{ paddingTop: "100%" }}
                        >
                            {article.imageUrls.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={`https://kr.object.ncloudstorage.com/kjwtest/article/${imageUrl}`}
                                    alt={`이미지 ${index + 1}`}
                                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                                        index === currentImageIndex
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                />
                            ))}
                            <button
                                className={`absolute top-1/2 left-0 transform bg-gray-200 -translate-y-1/2 text-white px-2 py-1 rounded ${
                                    currentImageIndex === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={handlePrevImage}
                                disabled={currentImageIndex === 0}
                            >
                                {"<"}
                            </button>
                            <button
                                className={`absolute top-1/2 right-0 transform bg-gray-200 -translate-y-1/2 text-white px-2 py-1 rounded ${
                                    currentImageIndex ===
                                    article.imageUrls.length - 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={handleNextImage}
                                disabled={
                                    currentImageIndex ===
                                    article.imageUrls.length - 1
                                }
                            >
                                {">"}
                            </button>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                                {article.imageUrls.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`inline-block w-2 h-2 rounded-full mx-1 ${
                                            index === currentImageIndex
                                                ? "bg-white"
                                                : "bg-gray-400"
                                        }`}
                                    ></span>
                                ))}
                            </div>
                        </div>
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
                                    <div className="flex place-items-center">
                                        <p className="text-black">
                                            {offer.offerPrice.toLocaleString(
                                                "ko-KR"
                                            )}
                                            원
                                        </p>
                                        {loggedInUserId === article.writerId &&
                                            !offer.selected && (
                                                <button
                                                    className="btn btn-ghost text-white bg-violet-500 ml-2"
                                                    onClick={() =>
                                                        handleAcceptOffer(
                                                            offer.id
                                                        )
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
                                                        handleCancelOffer(
                                                            offer.id
                                                        )
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
                        <div className="flex justify-between md:justify-end">
                            {loggedInUserId === article.writerId ? (
                                <>
                                    {article.tradeStatus === "SOLD_OUT" ? (
                                        <PostButton
                                            className="bg-violet-500"
                                            onClick={() =>
                                                toast.error(
                                                    "거래 완료된 상품은 수정할 수 없습니다"
                                                )
                                            }
                                        >
                                            수정하기
                                        </PostButton>
                                    ) : (
                                        <PostButton className="bg-violet-500">
                                            <Link to={`/post/modify/${aid}`}>
                                                수정하기
                                            </Link>
                                        </PostButton>
                                    )}
                                    <PostButton
                                        className="bg-orange-500"
                                        onClick={() => {
                                            if (
                                                article.tradeStatus ===
                                                "SOLD_OUT"
                                            ) {
                                                toast.error(
                                                    "거래 완료된 상품은 삭제할 수 없습니다"
                                                );
                                            } else {
                                                handleDelete();
                                            }
                                        }}
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
                                            } else if (
                                                article.tradeStatus ===
                                                "SOLD_OUT"
                                            ) {
                                                toast.error(
                                                    "이미 거래가 완료된 상품입니다."
                                                );
                                                return;
                                            } else {
                                                setSelectedArticleId(aid);
                                                openOfferModal(
                                                    selectedArticleId
                                                );
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
