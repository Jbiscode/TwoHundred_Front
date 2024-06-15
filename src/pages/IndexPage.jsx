// import { MainResponse } from "../api/mainApi.jsx";
import { useState, useEffect } from 'react';

import bannerImage1 from '@assets/images/banner/banner1.jpeg';
import bannerImage2 from '@assets/images/banner/banner2.png';
import bannerImage3 from '@assets/images/banner/banner3.jpeg';

import equipment from '@assets/images/icon/equipment.png';
import popularity from '@assets/images/icon/popularity.png';
import food from '@assets/images/icon/food.png';
import sportwear from '@assets/images/icon/exercies.png';
import supplies from '@assets/images/icon/supplies.png';
import pt2 from '@assets/images/icon/pt2.png';
import membership from '@assets/images/icon/membership8.png';
import newest from '@assets/images/icon/newest.png';



import BasicLayout from '@layouts/BasicLayout';
import useSocketStore from '@zustand/useSocketStore';
import { toast } from 'react-hot-toast';
import ChatAlarm from '@components/chat/ChatAlarm';
import {instance} from '@api/index.js';
import { Link } from 'react-router-dom';
import {auth} from '@api/index'


function IndexPage() {
    
    //배너
    const [currentSlide, setCurrentSlide] = useState(0);
    const { socket } = useSocketStore();
    

    //추천상품-페이징
    const [goodsList, setGoodsList] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [like, setLike] = useState(false)
    const itemsPerPage = 6;


    const handleSlideChange = (direction) => {
        if (direction === 'prev') {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
        } else {
        setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
        }
    };

    //자동 넘김
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
        }, 4000); // 4초

        socket?.on("newMessage", (newMessage) => {
            toast.custom((t) => (
                <ChatAlarm t={t} newMessage={newMessage} />
            ))
        });
        return () => clearInterval(interval); 
    }, [socket]);



    // 카테고리 Enum 정의
    const CategoryEnum = {
        ORDER_OF_POPULARITY: 'ORDER_OF_POPULARITY',
        NEWEST: 'NEWEST',
        MEMBERSHIP: 'MEMBERSHIP',
        PT: 'PT',
        HEALTH_SUPPLIES: 'HEALTH_SUPPLIES',
        HEALTH_EQUIPMENT: 'HEALTH_EQUIPMENT',
        SPORT_WEAR: 'SPORT_WEAR',
        FOOD: 'FOOD',
    };

    // 카테고리 목록 정의
    const categoryList = [
        { value: CategoryEnum.ORDER_OF_POPULARITY, text: '인기순', src: popularity },
        { value: CategoryEnum.NEWEST, text: '최신순', src: newest },
        { value: CategoryEnum.MEMBERSHIP, text: '회원권', src: membership },
        { value: CategoryEnum.PT, text: 'PT', src: pt2 },
        { value: CategoryEnum.HEALTH_SUPPLIES, text: '헬스용품', src: equipment },
        { value: CategoryEnum.HEALTH_EQUIPMENT, text: '헬스장비', src: supplies },
        { value: CategoryEnum.SPORT_WEAR, text: '스포츠웨어', src: sportwear },
        { value: CategoryEnum.FOOD, text: '건강식품', src: food },
    ];

    const handleCategoryClick = async (category) => {
        try {
            const response = await instance(`/api/v1/search?category=${category.value}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };


    useEffect(() => {
        instance.get('/api/v1/search')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .then(data => {
                console.log('Fetched data:', data);
                const allGoods = data || [];
                const shuffledGoods = allGoods.sort(() => 0.5 - Math.random());
                const selectedGoods = shuffledGoods.slice(0, 60);
                setGoodsList(selectedGoods);
            })
            .catch(error => {
                console.error('Error fetching goods data:', error);
                setError(error);
            });
    }, [like]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const currentGoods = goodsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(goodsList.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleLikeChange = (e,id) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('왜 안눌리누?')
        console.log(id)
        const fetch = async() => {
            try{
                const response = await auth.put(
                    `/api/v1/users/me/likes/${id}`,
                    {withCredentials: true}
                )
                if(response.resultCode == '401'){
                    openLoginModal()
                }
                if(response.resultCode == '200'){
                    console.log("click")
                    setLike(prev => !prev)
                    updateMyProfileInfo();
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch()
    }


    return (
        <BasicLayout>
            <div>
            <div className="flex flex-col">

            {/* 배너 */}
            <div className="z-0 carousel w-full" data-interval="false">
                <div className={`carousel-item relative w-full ${currentSlide === 0 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage1} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button className="btn btn-circle bg-transparent border-transparent text-white" onClick={() => handleSlideChange('prev')}>❮</button>
                        <button className="btn btn-circle bg-transparent border-transparent text-white" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
                <div className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage2} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button className="btn btn-circle bg-transparent border-transparent text-white" onClick={() => handleSlideChange('prev')}>❮</button>
                    <button className="btn btn-circle bg-transparent border-transparent text-white" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
                <div className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage3} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button className="btn btn-circle bg-transparent border-transparent text-white" onClick={() => handleSlideChange('prev')}>❮</button>
                    <button className="btn btn-circle bg-transparent border-transparent text-white" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
            </div>


            {/* 카테고리 */}
            <div className="justify-center flex-col flex-grow">
                <div className="mt-7 mb-7 grid justify-center">
                    <div className="category-list p-3 w-full justify-center grid grid-cols-4">
                        {categoryList.map((category) => (
                            <div key={category.value} className="grid p-1">
                                <a href={`search?orderBy=latest&category=${category.value}`} 
                                   onClick={() => handleCategoryClick(category)} >                          
                                         <img src={category.src} alt={category.text} className="m-[20px] w-12 h-[35px] items-center" />
                                </a>
                                <div className="category-text text-m font-family[Noto Sans] text-base h-full text-center grid items-center">
                                    {category.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
                
            {/* 추천상품 */}
            <div className="goods px-6">
                <div className="goods-wrapper -mx-2 w-full  grid justify-center box-border">
                    <div className="newgoods-title mt-30 mb-4 mx-7 text-lg font-bold">추천 상품</div>
                    <div className="goods-list  w-full grid box-border list-none grid-cols-2">
                        {currentGoods.length > 0 ? (
                            currentGoods.map((item) => (
                                <Link key={item.id} className="goods-cont mb-7 px-2" to={`/post/${item.id}`}>
                                    <div className='rounded-[10%] relative'>
                                        <img 
                                            src={`https://kr.object.ncloudstorage.com/kjwtest/article/${item.thumbnailUrl}`} 
                                            alt={item.imageId} 
                                            className="rounded-[10%]  border-solid border-[1px] border-[#f1f1f1] goods-icn mb-3 items-center max-w-[194px] h-[194px] block w-full" 
                                            //onError={(e) => { e.target.onerror = null; e.target.src = 'default-image-url'; }} // 이미지 로드 실패 시 대체 이미지 설정
                                        />
                                        
                                        <img className="absolute top-2 right-2" alt='frfrf' src={`/src/assets/images/icon/${item.isLiked === true ? 'heart_fill.svg' : 'heart_blank.svg'}`} onClick={(e)=>{handleLikeChange(e,item.id)}}/>
                                    </div>
                                    <div className='pl-1'>
                                        <p className="text-[16px] whitespace-nowrap text-ellipsis overflow-hidden font-bold my-1">
                                            {item.title}
                                        </p>
                                        <p className="my-1 flex text-sm gap-1 font-bold text-gray-400">
                                            {item.content}
                                        </p>
                                        <div className="text-lx font-bold">
                                            {Number(item.price).toLocaleString()}원
                                        </div>
                                    </div>               
                                </Link>
                            ))
                        ) : (
                            <div>로딩중...</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-gray-500 flex justify-center items-center space-x-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                    &lt;
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                   &gt;
                </button>
            </div>
        </div>
        </div>
        </BasicLayout>
    );
}

export default IndexPage;
