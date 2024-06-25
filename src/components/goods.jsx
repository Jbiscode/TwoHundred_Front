import { Link } from 'react-router-dom';
import HeartBlank from '@assets/images/icon/heart_blank.svg';
import HeartFill from '@assets/images/icon/heart_fill.svg';

const Goods = ({ data, likeState, handleLikeChange, isArticleLikedByUser }) => {
    return (
        <div>
            <div className="goods-wrapper w-full grid justify-center box-border">
                <div className="newgoods-title mt-30 mb-4 mx-7 text-lg font-bold">추천 상품</div>
                    <div className="goods-list w-full grid box-border list-none grid-cols-2">
                        {data.length > 0 ? (
                            data.map((item) => {
                                const isLiked = likeState[item.id] || isArticleLikedByUser(item.id);
                                const image = isLiked ? HeartFill : HeartBlank;
                                
                                return (
                                    <Link key={item.id} className="goods-cont mb-7 px-2" to={`/post/${item.id}`} onClick={window.scrollTo(0, 0)}>
                                        <div className='rounded-[10%] relative'>
                                            <img 
                                                src={`https://kr.object.ncloudstorage.com/kjwtest/article/${item.thumbnailUrl}`} 
                                                alt={item.imageId} 
                                                className="rounded-[10%] border-solid border-[1px] border-[#f1f1f1] goods-icn mb-3 items-center max-w-[194px] h-[194px] block w-full" 
                                            />
                                            <img 
                                                className="absolute top-2 right-2" 
                                                alt='like icon' 
                                                src={image} 
                                                onClick={(e) => handleLikeChange(e, item.id)} 
                                            />
                                        </div>
                                        <div className='pl-1'>
                                            <p className="text-[16px] whitespace-nowrap text-ellipsis overflow-hidden font-bold my-1">
                                                {item.title}
                                            </p>
                                            <p className="my-1 flex text-sm gap-1 font-bold text-gray-400">
                                                {item.content}
                                            </p>
                                            <div className="text-lx font-bold">
                                                {Number(item.price).toLocaleString()} 원
                                            </div>
                                        </div>               
                                    </Link>
                                );
                            })
                        ) : (
                            <div>데이터가 없습니다</div>
                        )}
                    </div>

            </div>
        </div>
    );
};

export default Goods;
