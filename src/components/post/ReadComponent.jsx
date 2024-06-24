import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@zustand/authStore.js";
import useModalStore from "@zustand/modalStore.js";

import { auth } from "@api/index.js";
import toast from "react-hot-toast";


import ArticleInfo from "@components/post/ArticleInfo";
import OfferList from "@components/post/OfferList";
import ArticleActions from "@components/post/ArticleActions";

function ReadComponent({ aid }) {
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
    const {
        openOfferModal,
        selectedArticleId,
        openLoginModal,
        openCheckModal,
        setSelectedArticleId,
        offerReload,
    } = useModalStore((state) => state);

    const [article, setArticle] = useState(initState);
    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await auth.get(`/api/v1/articles/${aid}`, {
                    withCredentials: true,
                });
                if (response.resultCode === "200") {
                    setArticle(response.data);
                    setLiked(response.data.liked);
                    setLikeCount(response.data.likeCount);
                } else if (response.data) {
                    toast.error("해당 게시물을 찾을 수 없습니다.");
                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [aid, isLoggedIn, navigate, offerReload]);

    return (
        <div className="mx-auto w-fit bg-white pb-8 px-6">
            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <ArticleInfo
                    article={article}
                    initialLiked={liked}
                    initialLikeCount={likeCount}
                />
            </div>

            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <div className="flex gap-10 flex-col md:flex-row m-auto md:m-0">
                    <OfferList
                        article={article}
                        loggedInUserId={loggedInUserId}
                        setArticle={setArticle}
                        aid={aid}
                    />
                    <ArticleActions
                        article={article}
                        loggedInUserId={loggedInUserId}
                        aid={aid}
                        openOfferModal={openOfferModal}
                        setSelectedArticleId={setSelectedArticleId}
                        openLoginModal={openLoginModal}
                        openCheckModal={openCheckModal}
                        setArticle={setArticle}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;
