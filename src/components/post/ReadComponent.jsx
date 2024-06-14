import { useEffect, useState } from "react";
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

    const { isLoggedIn } = useAuthStore();
    const loggedInUserId = useAuthStore((state) => state.getId());
    const { openOfferModal, closeOfferModal } = useModalStore((state) => state);

    const [article, setArticle] = useState(initState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/api/v1/articles/${aid}`, {
                    withCredentials: true,
                });
                console.log("response:", response);

                if (response.resultCode === "200") {
                    setArticle(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then((r) => console.log(r));
    }, [aid]); // aid가 변경될 때마다 useEffect 실행

    //게시글 삭제
    const handleDelete = async () => {
        try {
            const response = await auth.delete(`/api/v1/articles/${aid}`, {
                withCredentials: true,
            });
            console.log("response:", response);
            if (response.resultCode === "200") {
                console.log("게시글 삭제 성공");
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
        <div className="mx-auto w-fit bg-white py-8 px-10">
            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <div className="flex gap-10 flex-col md:flex-row m-auto md:m-0">
                    <img
                        src={`https://kr.object.ncloudstorage.com/kjwtest/article/${article.thumbnailUrl}`}
                        alt={"프로필"}
                        className="w-[300px] aspect-square"
                    />
                    <div className="w-[300px]">
                        <div className="flex items-center">
                            <img
                                src={`${article.writerProfileImageUrl}`}
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
                            가격 제안{" "}
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
                                    <p className="text-black">
                                        {offer.offerPrice}원
                                    </p>
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
                                    <PostButton className="bg-orange-500" onClick={handleDelete}>
                                        삭제하기
                                    </PostButton>
                                </>
                            ) : (
                                <>
                                    <PostButton className="bg-violet-500">
                                        1:1 채팅하기
                                    </PostButton>
                                    <PostButton className="bg-orange-500" onClick={openOfferModal}>
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
