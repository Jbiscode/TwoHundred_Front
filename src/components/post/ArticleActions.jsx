import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PostButton from "@components/post/PostButton.jsx";
import { auth } from "@api/index.js";
import toast, { Toaster } from "react-hot-toast";
import useModalStore from "@zustand/modalStore.js";

function ArticleActions({
    article,
    loggedInUserId,
    aid,
    openOfferModal,
    setSelectedArticleId,
    openLoginModal,
    openCheckModal,
    setArticle,
}) {
    const navigate = useNavigate();

    const { setOfferReload } = useModalStore((state) => state);

    const handleDelete = async () => {
        try {
            const response = await auth.delete(`/api/v1/articles/${aid}`, {
                withCredentials: true,
            });
            if (response.resultCode === "200") {
                toast.success("게시글이 삭제되었습니다.");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelDelete = () => {
        toast.success("삭제가 취소되었습니다.");
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
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        tradeStatus: "SOLD_OUT",
                    }));
                    toast.success("판매가 완료되었습니다.");
                    setOfferReload();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const navigateToChatRoom = async (articleId, userId) => {
        const response = await auth.post(`/api/v1/chatroom/enter`, {
            body: JSON.stringify({ articleId, userId }),
            withCredentials: true,
        });
        window.scrollTo({ top: 0 });
        navigate(`/chat/room/${response.data.chatRoomId}`);
    };

    return (
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
                            <Link to={`/post/modify/${aid}`}>수정하기</Link>
                        </PostButton>
                    )}
                    <PostButton
                        className="bg-orange-500"
                        onClick={() => {
                            if (article.tradeStatus === "SOLD_OUT") {
                                toast.error(
                                    "거래 완료된 상품은 삭제할 수 없습니다"
                                );
                            } else {
                                openCheckModal(
                                    handleDelete,
                                    handleCancelDelete
                                );
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
                                navigateToChatRoom(aid, loggedInUserId);
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
                            } else if (article.tradeStatus === "SOLD_OUT") {
                                toast.error("이미 거래가 완료된 상품입니다.");
                                return;
                            } else {
                                setSelectedArticleId(aid);
                                openOfferModal(setSelectedArticleId);
                            }
                        }}
                    >
                        거래 제안하기
                    </PostButton>
                </>
            )}
        </div>
    );
}

export default ArticleActions;
