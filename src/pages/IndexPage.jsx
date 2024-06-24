// import { MainResponse } from "../api/mainApi.jsx";
import { useState, useEffect, useCallback} from 'react';

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


import Goods from '../components/goods';
import BasicLayout from '@layouts/BasicLayout';
import useSocketStore from '@zustand/useSocketStore';
import { toast } from 'react-hot-toast';
import ChatAlarm from '@components/chat/ChatAlarm';
import {instance} from '@api/index.js';
import { Link } from 'react-router-dom';
import {auth} from '@api/index'
import useModalStore from '@zustand/modalStore';
import usemyprofileStore from "@zustand/myprofileStore"
import useAuthStore from "@zustand/authStore"


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

function IndexPage() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    //const {openLoginModal} = useModalStore(state => state) -- 중복
    
    //배너
    const [currentSlide, setCurrentSlide] = useState(0);
    const { socket } = useSocketStore();
    

    const itemsPerPage = 6;
    const maxItems = 60; // 최대 60개의 데이터만 요청

    //배너
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

        return () => clearInterval(interval); 
    }, []);

    // 카테고리 Enum 정의
    const CategoryEnum = {
        HOT: 'HOT',
        LATEST: 'LATEST',
        MEMBERSHIP: 'MEMBERSHIP',
        PT: 'PT',
        HEALTH_SUPPLIES: 'HEALTH_SUPPLIES',
        HEALTH_EQUIPMENT: 'HEALTH_EQUIPMENT',
        SPORT_WEAR: 'SPORT_WEAR',
        FOOD: 'FOOD',
    };

    // 카테고리 목록 정의
    const categoryList = [
        { value: CategoryEnum.HOT, text: '인기순', src: popularity },
        { value: CategoryEnum.LATEST, text: '최신순', src: newest },
        { value: CategoryEnum.MEMBERSHIP, text: '회원권', src: membership },
        { value: CategoryEnum.PT, text: 'PT', src: pt2 },
        { value: CategoryEnum.HEALTH_SUPPLIES, text: '헬스용품', src: equipment },
        { value: CategoryEnum.HEALTH_EQUIPMENT, text: '헬스장비', src: supplies },
        { value: CategoryEnum.SPORT_WEAR, text: '스포츠웨어', src: sportwear },
        { value: CategoryEnum.FOOD, text: '건강식품', src: food },
    ];


    //추천상품-페이징
    const fetchData = useCallback(async (page, size) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/v1/search?page=${page}&size=${size}&tradeStatus=ON_SALE`);
            const result = await response.json();
            console.log('Fetched data:', result);
            
            if (result.data && Array.isArray(result.data.searchResult)) {
                const totalCount = result.data.totalCount > maxItems ? maxItems : result.data.totalCount;
                const shuffledData = shuffleArray(result.data.searchResult);
                setData(shuffledData);
                setTotalPages(Math.ceil(totalCount / size));
                setLikeArticle(data.likeResult);
            } else {
                console.error('searchResult가 배열이 아닙니다:', result.data.searchResult);
                setData([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('API 요청 실패:', error);
            setData([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(currentPage, itemsPerPage);
        }, [currentPage, fetchData]);


    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
        }, []);


    //로그인했을 경우 id 값 가져오기
    const {id} = useAuthStore()
    const [likeArticle, setLikeArticle] = useState([]);

    //좋아요 클릭
    const { updateMyProfileInfo } = usemyprofileStore(state => state)
    const {openLoginModal} = useModalStore(state => state)

    const [likeState, setLikeState] = useState({});


    const isArticleLikedByUser = (articleId) => { 
        if (!id || !Array.isArray(likeArticle)) return false;
        return likeArticle.some(la => la.user_id === id && la.article_id === articleId);
    };


    const handleLikeChange = (e, articleId) => {
        e.stopPropagation()
        e.preventDefault()
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
                    console.log("click")
                    setLikeState(prevState => ({
                        ...prevState,
                        [articleId]: !prevState[articleId]
                    }));
                    updateMyProfileInfo();
                }
                if(response.resultCode == '403'){
                    toast.error("자신의 게시글은 좋아요할 수 없습니다.")
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch()
    }
    
    return (
        <BasicLayout>
            <div className='md:absolute md:top-0 md:left-0 md:z-[9999] md:w-full md:h-screen bg-white hidden md:block'>모바일버전으로 봐주세요</div>
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
                                        <Link
                                        to={
                                        category.value === CategoryEnum.HOT || category.value === CategoryEnum.LATEST
                                            ? `search?orderBy=${category.value}`
                                            : `search?orderBy=latest&category=${category.value}`
                                        }
                                        
                                        >
                                            <img src={category.src} alt={category.text} className="m-[20px] w-12 h-[35px] items-center" />
                                        </Link>
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
                        <Goods data={data}
                                isLoading={isLoading}
                                likeState={likeState}
                                handleLikeChange={handleLikeChange}
                                isArticleLikedByUser={isArticleLikedByUser} />
                    
                        {/* 페이징 버튼 */}
                        <div className="text-gray-500 flex justify-center items-center space-x-4">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &lt;
                            </button>
                            <span>{currentPage} / {totalPages}</span>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &gt;
                            </button>
                        </div>

                    </div>{/* 추천상품 */}

                </div>
            </div>
        </BasicLayout>
);
}
export default IndexPage;
