import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {auth} from '@api/index';
import toast from 'react-hot-toast';
import useModalStore from "@zustand/modalStore"
import usemyprofileStore from "@zustand/myprofileStore"
import useAuthStore from "@zustand/authStore"
import HeartBlank from '@assets/images/icon/heart_blank.svg';
import HeartFill from '@assets/images/icon/heart_fill.svg';

const SearchArticleComponent = ({content, articleDTO, likeArticle, setLikeArticle, loading, hasMore, setPage}) => {
    //로그인했을 경우 id 값 가져오기
    const {id} = useAuthStore();
    const observer = useRef();

    const lastItemRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage(prev => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );
    
    // 좋아요 확인              
    const isArticleLikedByUser = (articleId) => { 
        if (!id) return false;
        return likeArticle.some(la => la.user_id === id && la.article_id === articleId);
    };


    //좋아요 클릭
    const { updateMyProfileInfo } = usemyprofileStore(state => state)
    const {openLoginModal} = useModalStore(state => state)
    
    const handleLikeChange = (e, articleId) => {
        e.preventDefault();
        e.stopPropagation();

        const fetch = async() => {
            try{
                const response = await auth.put(
                    `/api/v1/users/me/likes/${articleId}`,
                    {withCredentials: true}
                )
                if(response.resultCode == '401'){
                    openLoginModal();
                }
                if(response.resultCode == '200'){
                    updateMyProfileInfo();

                    setLikeArticle(prev => {
                        if (isArticleLikedByUser(articleId)) {
                            return prev.filter(la => la.article_id !== articleId);
                        } else {
                            return [...prev, { user_id: id, article_id: articleId }];
                        }
                    });
                }
                if(response.resultCode == '403'){
                    toast.error("자신의 게시글은 좋아요를 누를 수 없습니다.")
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch();
    }


    return (
        <div>
            <div className='mt-5 px-3'>
                <div className="goods">
                    <div className="goods-wrapper w-full justify-center box-border">
                        {Array.isArray(articleDTO) && articleDTO.length > 0 ? (
                            <div className="goods-list w-full flex flex-col box-border list-none">
                                {articleDTO.map((item, index) => (
                                    <Link 
                                        ref={index === articleDTO.length - 1 ? lastItemRef : null} 
                                        key={`${item.id} + ${Math.random().toString(36).substr(2, 9)}`}
                                        className="goods-cont overflow-hidden pb-2 mb-5 px-2 flex flex-grow"
                                        to={`/post/${item.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <div className="relative w-1/2">
                                            <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${item.thumbnailUrl}`} alt={item.imageId} className="rounded-[10%] border-solid border-[1px] border-[#f1f1f1] goods-icn mb-3 items-center max-w-[194px] block w-[194px] h-[140px]" />
                                            {
                                                item.tradeStatus === 'SOLD_OUT' &&
                                                <div className="text-lg text-white flex justify-center items-center w-full h-full absolute bg-black/30 top-0 rounded-[10%]">
                                                    거래 완료
                                                </div>
                                            }
                                            <img 
                                                src={isArticleLikedByUser(item.id) ? HeartFill : HeartBlank} 
                                                alt='like' 
                                                className="absolute top-2 right-2"
                                                onClick={ (e) => { 
                                                    e.preventDefault();  // 기본 동작 막기
                                                    handleLikeChange(e, item.id); 
                                                }}
                                            />
                                        </div>
                                        <div className='ml-3 flex-grow w-1/2'>
                                            <p className="text-[20px] whitespace-nowrap text-ellipsis overflow-hidden font-bold">
                                                {item.title}
                                            </p>
                                            <p className="my-1 flex text-sm gap-1 font-bold text-gray-400">{item.addr1} {item.addr2}</p>
                                            <p className="flex justify-between goods-cont_bottom"></p>
                                            <p className="text-lx font-bold">{Number(item.price).toLocaleString()}원</p>
                                        </div>
                                    </Link>
                                ))}
                                {loading && <div>Loading...</div>}
                            </div>
                        ) : (
                            <p>
                                <br />
                                {content} 와 관련된 상품이 존재하지 않습니다.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchArticleComponent;