// import { MainResponse } from "../api/mainApi.jsx";
import { useState, useEffect } from 'react';

import bannerImage1 from '@assets/images/banner/banner1_mobile.png';
import bannerImage2 from '@assets/images/banner/banner2_mobile.png';
import bannerImage3 from '@assets/images/banner/banner3_mobile.png';

import equipment from '@assets/images/icon/equipment.png';
import popularity from '@assets/images/icon/popularity.png';
import food from '@assets/images/icon/food.png';
import sportwear from '@assets/images/icon/sportwear.png';
import supplies from '@assets/images/icon/supplies.png';
import pt2 from '@assets/images/icon/pt2.png';
import membership from '@assets/images/icon/membership.png';
import newest from '@assets/images/icon/newest.png';



import BasicLayout from '@layouts/BasicLayout';
import useSocketStore from '@zustand/useSocketStore';
import { toast } from 'react-hot-toast';
import ChatAlarm from '@components/chat/ChatAlarm';


function IndexPage() {
    
    //배너
    const [currentSlide, setCurrentSlide] = useState(0);
    const { socket } = useSocketStore();
    //추천상품-페이징
    const [goodsList, setGoodsList] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

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

    // 카테고리
    const categoryList = [
        {
          value: 1,
          text: '인기순',
          src: popularity
        },
        {
          value: 2,
          text: '최신순',
          src: newest
        },
        {
          value: 3,
          text: '회원권',
          src: membership
        },
        {
          value: 4,
          text: 'PT',
          src: pt2
        },
        {
          value: 5,
          text: '헬스용품',
          src: equipment
        },
        {
          value: 6,
          text: '헬스장비',
          src: supplies
        },
        {
          value: 7,
          text: '스포츠웨어',
          src: sportwear
        },
        {
          value: 8,
          text: '건강식품',
          src: food
        },
    ]




    useEffect(() => {
        fetch('/api/v1/search')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                const allGoods = data.data || [];
                const shuffledGoods = allGoods.sort(() => 0.5 - Math.random());
                const selectedGoods = shuffledGoods.slice(0, 60);
                setGoodsList(selectedGoods);
            })
            .catch(error => {
                console.error('Error fetching goods data:', error);
                setError(error);
            });
    }, []);


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


    return (
        <BasicLayout>
            <div>
            <div className="flex flex-col">

            {/* 배너 */}
            <div className="z-0 carousel w-full" data-interval="false">
                <div className={`carousel-item relative w-full ${currentSlide === 0 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage1} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button className="btn btn-circle bg-transparent border-transparent" onClick={() => handleSlideChange('prev')}>❮</button>
                        <button className="btn btn-circle bg-transparent border-transparent" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
                <div className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage2} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button className="btn btn-circle bg-transparent border-transparent" onClick={() => handleSlideChange('prev')}>❮</button>
                    <button className="btn btn-circle bg-transparent border-transparent" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
                <div className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage3} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button className="btn btn-circle bg-transparent border-transparent" onClick={() => handleSlideChange('prev')}>❮</button>
                    <button className="btn btn-circle bg-transparent border-transparent" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
            </div>


            {/* 카테고리 */}
            <div className="justify-center flex-col flex-grow">
                <div className="mt-7 mb-7 grid justify-center">
                    <div className="category-list p-3 w-full justify-center grid grid-cols-4">
                        {categoryList.map((category, index) => (
                            <div key={category.value || index} className="grid p-1">
                                <a href="#">
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
            <div className="newgoods-title mt-30 mb-2 mx-7 text-lg font-bold">추천 상품</div>
            <div className="goods">
                <div className="goods-wrapper w-full grid justify-center box-border">
                    <div className="goods-list mr-7 ml-3 w-full grid box-border list-none grid-cols-2 ">
                        {currentGoods.length > 0 ? (
                            currentGoods.map((item) => (
                                <div key={item.id} className="goods-cont mb-4">
                                    <a href="#"><img src={item.src} alt={item.title} className="goods-icn items-center max-w-[165px] h-[211px]" /></a>
                                    <span className="w-full text-base font-medium truncate h-5 break-words inline-block line-clamp-1">
                                        {item.title}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {item.meta}
                                    </span>
                                    <span className="flex justify-between goods-cont_bottom"></span>
                                    <span className="text-lg font-extrabold goods-cont_price">
                                        {item.price}
                                    </span>                
                                </div>
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
