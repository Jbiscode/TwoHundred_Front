import React, { useEffect, useRef, useState, useCallback } from 'react';
import filter from '@assets/images/icon/filter.svg';
import { Link, useLocation } from 'react-router-dom';
import {instance, auth} from '@api/index';
import useModalStore from "@zustand/modalStore"
import usemyprofileStore from "@zustand/myprofileStore"
import useAuthStore from "@zustand/authStore"



const Search = () => {
    const [articleDTO, setArticleDTO] = useState([]);
    //검색 결과
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('content');
    const [content, setContent] = useState(query || '');
    
    //정렬
    const [orderBy, setOrderBy] = useState('latest');

    //필터
    const initialCategory = new URLSearchParams(location.search).get('category') || location.state?.category || null;
    const [category, setCategory] = useState(initialCategory);
    const [tradeMethod, setTradeMethod] = useState(null);

    //검색결과 총 개수
    const [totalCount, setTotalCount] = useState(0);

    //페이징
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    //필터 구분
    const categoryCode = [
        {
            id : 'MEMBERSHIP',
            value : false,
            htmlFor: '회원권',
            key: 1,
        },
        {
            id : 'PT',
            value : false,
            htmlFor: 'PT',
            key: 2,
        },
        {
            id : 'HEALTH_SUPPLIES',
            value : false,
            htmlFor: '헬스용품',
            key: 3,
        },
        {
            id : 'HEALTH_EQUIPMENT',
            value : false,
            htmlFor: '헬스장비',
            key: 4,
        },
        {
            id : 'SPORT_WEAR',
            value : false,
            htmlFor: '스포츠웨어',
            key: 5,
        },
        {
            id : 'FOOD',
            value : false,
            htmlFor: '건강식품',
            key: 6,
        },
    ]

    const tradeMethodCode = [
        {
            htmlFor: '상관없음',
            key: 1,
            value: false,
            id: 'NO_MATTER'  
        },
        {
            htmlFor: '직거래',
            key: 2,
            value: false,
            id: 'FACE_TO_FACE'
        },
        {
            htmlFor: '택배 거래',
            key: 3,
            value: false,
            id: 'DELIVERY'
        }
    ]


    useEffect(() => {
        if (query !== content) {
            setContent(query || '');
        }
    }, [query]);
    
    const fetchArticles = async (reset = false) => {
        if(loading) return;
        setLoading(true);
        let url = `/api/v1/search`;
        let params = [];
    
        if (orderBy) {
            params.push(`orderBy=${orderBy}`);
        }
        if (content) {
            params.push(`content=${content}`);
        }
        if (category) {
            params.push(`category=${category}`);
        }
        if (tradeMethod) {
            params.push(`tradeMethod=${tradeMethod}`);
        }
        params.push(`page=${page}`);
        params.push(`size=10`);
    
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
    
        const urlParams = params.filter(param => !param.startsWith('page=') && !param.startsWith('size='));
        window.history.replaceState(null, '', urlParams.length > 0 ? `?${urlParams.join('&')}` : '');
    
        try {
            const response = await instance.get(url);
            const data = response.data;
            if (Array.isArray(data.searchResult)) {
                setArticleDTO(prev => reset ? data.searchResult : [...prev, ...data.searchResult]);
                console.log('articleDTO:', data.searchResult); 
                setTotalCount(data.totalCount);
                setLikeArticle(data.likeResult);
                console.log('likeArticle:', data.likeResult); 

                setHasMore(data.searchResult.length === 10);
               
            } else {
                console.error('Expected an array but got:', data);
                setHasMore(false); 
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setHasMore(false); 
        } finally {
            setLoading(false);
        }
    };
    
    //페이징
    useEffect(() => {
        setPage(1);
        fetchArticles(true);
    }, [content, orderBy, category, tradeMethod]);
    
    useEffect(() => {
        if (page > 1) fetchArticles();
    }, [page]);
    
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
    


    //카테고리 선택
    const handleCategory = (item) => {
        setCategory(item.id);
        setPage(1);
    };
    
    //거래방식 선택
    const handleTradeMethod = (item) => {
        setTradeMethod(item.id);
        setPage(1);
    };

    //정렬 선택
    const handleOrderBy = (value) => {
        setOrderBy(value);
        setPage(1);
    };


    
    const [isopenedFilter, setIsopenedFilter] = useState(false);
    
    const handleFilter = () => {
        setPage(1);
        fetchArticles(true);
        setIsopenedFilter(!isopenedFilter);
    };

    const handleReset = () => {
        setCategory(null);
        setTradeMethod(null);
        setPage(1);
        fetchArticles(true);
    };

    //로그인했을 경우 id 값 가져오기
    const {id} = useAuthStore()
    const [likeArticle, setLikeArticle] = useState([]);
    

    // 좋아요 확인              
    const [like, setLike] = useState(false);
    const isArticleLikedByUser = (articleId) => { 
        if (!id) return false;
        return likeArticle.some(la => la.user_id === id && la.article_id === articleId);
    };


    //좋아요 클릭
    const { updateMyProfileInfo } = usemyprofileStore(state => state)
    const {openLoginModal} = useModalStore(state => state)
    


    const handleLikeChange = (e, articleId) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('왜 안눌리누?')
        console.log(articleId)
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
                    setLike(prev => !prev)
                    updateMyProfileInfo();

                    await fetchArticles(true);
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch()
    }

    return (
        <div>
            {/* filter */}
            <div className={isopenedFilter ? '!m-0' : ''}>
            <div className={`absolute bg-white top-0 left-0 rounded-lg shadow-lg h-full transition-opacity duration-500 ${isopenedFilter ? 'opacity-100 visible z-30' : 'opacity-0 invisible'}`}>
                <div className="overflow-hidden ">
                    <form encType="multipart/form-data">
                        <div className="inset-y-0 right-0">
                            {/* 카테고리 */}
                            <div className="px-8 pt-10 w-screen">
                                <div className="flex justify-between items-center border-b-2 border-solid pb-4">
                                    <h3 className="font-bold text-lg">카테고리</h3>
                                    <button className="btn btn-square bg-white border-0" type='reset' onClick={() => setIsopenedFilter(!isopenedFilter)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <ul className="flex flex-col space-y-2 h-48 pt-3 overflow-y-auto">
                                    {categoryCode.map((item) => (
                                        <div key={item.id} className={category === item.id ? 'text-green-700' : 'text-black'}>
                                            <input
                                                type="radio"
                                                id={item.id}
                                                className="hidden"
                                                value={item.value}
                                                onChange={() => handleCategory(item)}
                                            />
                                            <label
                                                className="cursor-pointer text-sm"
                                                htmlFor={item.htmlFor}
                                                onClick={() => handleCategory(item)}>
                                                {item.htmlFor}
                                            </label>
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            {/* 거래 방식 */}
                            <div className="px-8 pt-10">
                                <h3 className="font-bold pb-4 text-lg border-b-2 border-solid">거래방식</h3>
                                <div className="flex flex-col space-y-4 mt-4">
                                    {tradeMethodCode.map((item) => (
                                        <div key={item.id} className={tradeMethod === item.id ? 'text-green-700' : 'text-black'}>
                                            <label
                                                className="flex items-center cursor-pointer"
                                                htmlFor={item.htmlFor}
                                                onClick={() => handleTradeMethod(item)}>
                                                <span className='text-sm'>{item.htmlFor}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* 가격 */}
                            {/* <div className="px-8 pt-10">
                                <h3 className="font-bold pb-4 text-lg border-b-2 border-solid">가격</h3>
                                <div className="flex flex-col space-y-4 mt-10">
                                    <div className="flex space-x-4">
                                        <input 
                                            
                                            name="minPrice"
                                            placeholder="최소 가격"     
                                            className="input input-bordered w-1/2 text-center bg-white border-gray-300"
                                            type="number"
                                        />
                                        <input id="maxPrice"
                                            name="maxPrice"
                                            placeholder="최대 가격"
                                            className="input input-bordered w-1/2 text-center bg-white border-gray-300"
                                            type="number"                                   
                                        />  
                                    </div>
                                    <p className="text-gray-500 text-sm text-center">
                                            가격은 숫자로만 입력할 수 있어요!
                                    </p>
                                </div>
                            </div> */}

                        </div>
                        <div className="pt-10 flex flex-col items-center space-y-4">
                            <button type='button' className='btn  text-white bg-green-700 border-green-700 w-2/3'
                                onClick={handleFilter}>
                                필터 적용
                            </button>
                            <button type='reset' className='btn btn-outline w-2/3 border-green-700 text-green-700' onClick={handleReset}>
                                초기화
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>

            {/* header */}
            <div className="w-full mx-auto">
            <div className="text-2xl">
            <div className="text-2xl px-3">
                <h3 className="inline-block m-0 text-m font-bold border-b-2 border-gray-300">
                {content ? (
                    <>
                        <span className='text-red-500'>'{content}'</span> 의 검색 결과
                    </>
                ) : (
                    "전체 검색 결과"
                )}
                </h3>
                <span className="ml-2 text-red-500 text-[20px]">{totalCount}</span>
            </div>
            <div className="mt-5 w-full flex justify-between items-center  pb-2 px-3">
                <div className="">
                <div
                    className="border-solid border border-gray-300 cursor-pointer p-1 bg-white rounded-lg flex items-center text-sm"
                    onClick={() => setIsopenedFilter(!isopenedFilter)}
                    >
                    <span>필터</span>
                    <img 
                    className='inline-block ml-1'
                    src={filter}
                    alt='filter' />
                </div>
                </div>
                
                <div className="flex justify-end items-center mt-2">
                    <div
                        className={`text-[12px] after:content-[''] after:mx-2 after:border after:border-gray-300 cursor-pointer ${orderBy === 'latest' ? 'text-red-500' : ''}`}
                        id='latest'
                        onClick={() => handleOrderBy('latest')}
                    >
                        최신순
                    </div>
                    <div
                        className={`text-[12px] after:content-[''] after:mx-2 after:border after:border-gray-300  cursor-pointer ${orderBy === 'lowPrice' ? 'text-red-500' : ''}`}
                        id='lowPrice'
                        onClick={() => handleOrderBy('lowPrice')}
                    >
                        낮은 가격순
                    </div>
                    <div
                        className={`text-[12px] cursor-pointer ${orderBy === 'highPrice' ? 'text-red-500' : ''}`}
                        id='highPrice'
                        onClick={() => handleOrderBy('highPrice')}
                    >
                        높은 가격순
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div className='h-[8px] bg-[#ececec] w-full'></div>
            {/* body */}
            <div className='mt-5'>
                <div className="goods">
                    <div className="goods-wrapper w-full justify-center box-border">
                        {Array.isArray(articleDTO) && articleDTO.length > 0 ? (
                            <div className="goods-list w-full flex flex-col box-border list-none">
                                {articleDTO.map((item, index) => (
                                    <Link 
                                        ref={index === articleDTO.length - 1 ? lastItemRef : null} 
                                        key={`${item.id} + ${Math.random().toString(36).substr(2, 9)}`}
                                        className="goods-cont overflow-hidden pb-2 mb-5 px-2 flex flex-grow  "
                                        to={`/post/${item.id}`}
                                    >
                                       <div className="relative">
                                            <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${item.thumbnailUrl}`} alt={item.imageId} className="rounded-[10%] border-solid border-[1px] border-[#f1f1f1] goods-icn mb-3 items-center max-w-[194px] w-full block" />
                                            <img 
                                                src={isArticleLikedByUser(item.id) ? '/src/assets/images/icon/heart_fill.svg' : '/src/assets/images/icon/heart_blank.svg'} 
                                                alt='like' 
                                                className="absolute top-2 right-2"
                                                onClick={(e)=>{handleLikeChange(e, item.id)}}
                                            />
                                        </div>
                                        <div className='ml-3 flex-grow'>
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
export default Search;