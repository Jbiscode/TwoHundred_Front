import React, { useState } from "react";
import { auth } from "@api/index.js";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import HeartBlank from "@assets/images/icon/heart_blank.svg";
import HeartFill from "@assets/images/icon/heart_fill.svg";
import { timeAgo } from "@utils/timeAgo";

function ArticleInfo({ article, initialLiked, initialLikeCount }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const tradeMethodMap = {
        FACE_TO_FACE: "직거래",
        DELIVERY: "택배거래",
        NO_MATTER: "상관없음",
    };

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
        try {
            const response = await auth.post(
                `/api/v1/articles/${article.id}/like`,
                {
                    withCredentials: true,
                }
            );
            if (response.resultCode === "200") {
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
            }
            if (response.resultCode == "403") {
                toast.error("자신의 게시글은 좋아요를 누를 수 없습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex gap-3 flex-col md:flex-row m-auto md:m-0">
                <div className="relative">
                    <img
                        src={`https://kr.object.ncloudstorage.com/kjwtest/article/${article.thumbnailUrl}`}
                        alt={"프로필"}
                        className="w-[300px] aspect-square rounded-[10%]"
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to={`/users/${article.writerId}`}>
                                <img
                                    src={`https://kr.object.ncloudstorage.com/kjwtest/article/${article.writerProfileImageUrl}`}
                                    alt="프로필"
                                    className="w-[50px] h-[50px] rounded-full mr-4 border-gray-300 border-solid border-2"
                                />
                            </Link>
                            <Link to={`/users/${article.writerId}`}>
                                <h2 className="text-3xl text-[#EFA43D] mt-5 mb-5">
                                    {article.writerUsername}
                                </h2>
                            </Link>
                        </div>
                    </div>

                    <h2 className="text-3xl mt-4 mb-2">{article.title}</h2>
                    <h3 className="text-xl flex gap-3 ml-2 items-center">
                        <p>{article.price.toLocaleString("ko-KR")}원</p>
                        <p className="text-gray-400 text-sm bg-black/[0.05] p-2 rounded-lg">
                            {tradeMethodMap[article.tradeMethod]}
                        </p>
                    </h3>
                    <div className="flex mt-2 items-center gap-1">
                        <p className="text-gray-400 text-sm ml-2">
                            {timeAgo(article.createdDate)}
                        </p>
                        <p className="text-gray-400 text-sm">|</p>
                        <p className="text-gray-400 text-sm">
                            {article.addr1} {article.addr2}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[300px]">
                <h1 className="text-4xl text-black md:mt-10 mb-4">상품 정보</h1>
                <hr className="border-2 border-black" />
                <p className="space-y-2 mt-4 mb-4 whitespace-pre-line">{article.content}</p>
                <div
                    className="relative w-full mb-4"
                    style={{ paddingTop: "100%" }}
                >
                    {article.imageUrls.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={`https://kr.object.ncloudstorage.com/kjwtest/article/${imageUrl}`}
                            alt={`이미지 ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 rounded-[10%] ${
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
                            currentImageIndex === article.imageUrls.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        onClick={handleNextImage}
                        disabled={
                            currentImageIndex === article.imageUrls.length - 1
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
        </>
    );
}
export default ArticleInfo;
