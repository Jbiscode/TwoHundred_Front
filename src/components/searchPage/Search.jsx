import React, { useEffect, useRef, useState } from 'react';
import filter from '@assets/images/icon/filter.svg';
import { useLocation } from 'react-router-dom';
import {instance} from '@api/index.js';



const Search = () => {
    const [articleDTO, setArticleDTO] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('content');
    const [searchContent, setSearchContent] = useState(query || '');
    const [selectedOption, setSelectedOption] = useState('latest');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedtrade, setSelectedtrade] = useState(null);

    useEffect(() => {
        if (query !== searchContent) {
            setSearchContent(query || '');
        }
    }, [query]);

    useEffect(() => {
        let url = `/api/v1/search`;
        switch (selectedOption) {
            case 'latest':
                url += `/orderByLatest`;
                break;
            case 'lowPrice':
                url += `/orderByRowPrice`;
                break;
            case 'highPrice':
                url += `/orderByHighPrice`;
                break;
            default:
                break;
        }
        if (searchContent) {
            url += `?content=${searchContent}`;
        }
        if (selectedCategory) {
            url += `?category=${selectedCategory}`;
        }
        if (selectedtrade) {
            url += `?tradeMethod=${selectedtrade}`;
        }

        instance.get(url)
            .then(response => {
                console.log('Fetched categories:', response);
                return response.data;
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setArticleDTO(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [searchContent, selectedOption, selectedCategory, selectedtrade]);
    
    const articleCount = articleDTO.length;

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

    //카테고리 선택
    const handleSelectCategory = (item) => {
        setSelectedCategory(item.id);
    };
    
    //거래방식 선택
    const handleSelectedtrade = (item) => {
        setSelectedtrade(item.id); 
    };

    //정렬
    const handleSelectOption = (id) => {
        setSelectedOption(id);
    };


    const [isopenedFilter, setIsopenedFilter] = useState(false);

    const handleReset = () => {
        setSelectedCategory(null);
        setSelectedtrade(null);
    }

    return (
        <div>
            {/* filter */}
            <div className={isopenedFilter ? '!m-0' : ''}>
            <div className={`absolute bg-white top-0 left-0 rounded-lg shadow-lg h-full transition-opacity duration-500 ${isopenedFilter ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="overflow-hidden">
                    <form
                    //onSubmit={filterFormik.handleSubmit}
                    //method="post"
                    encType="multipart/form-data">
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
                                        <div key={item.id} className={selectedCategory === item.id ? 'text-green-700' : 'text-black'}>
                                            <input
                                                type="radio"
                                                id={item.id}
                                                className="hidden"
                                                value={item.value}
                                                onChange={() => handleSelectCategory(item)}
                                            />
                                            <label
                                                className="cursor-pointer text-sm"
                                                htmlFor={item.htmlFor}
                                                onClick={() => handleSelectCategory(item)}>
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
                                        <div key={item.id} className={selectedtrade === item.id ? 'text-green-700' : 'text-black'}>
                                            <label
                                                className="flex items-center cursor-pointer"
                                                htmlFor={item.htmlFor}
                                                onClick={() => handleSelectedtrade(item)}>
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
                            <button className='btn  text-white bg-green-700 border-green-700 w-2/3'
                                onClick={() => setIsopenedFilter(!isopenedFilter)}>
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
            <div className="w-[90%] mx-auto ">
            <div className="text-2xl">
            <div className="text-2xl">
                {/* <h3>{`"${title || ''}" 의 검색결과`}</h3> */}
                <h3 className="inline-block m-0 text-m font-bold border-b-2 border-gray-300">
                    " {searchContent} "의 검색 결과
                </h3>

                {/* <span>{title ? goodsList.length : 0}</span> */}
                <span className="ml-2 text-red-500 text-[20px]">{articleCount}</span>
            </div>
            <div className="mt-5 w-full flex justify-between items-center">
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
                        className={`text-[12px] after:content-[''] after:mx-2 after:border after:border-gray-300 cursor-pointer ${selectedOption === 'latest' ? 'text-red-500' : ''}`}
                        id='latest'
                        onClick={() => handleSelectOption('latest')}
                    >
                        최신순
                    </div>
                    <div
                        className={`text-[12px] after:content-[''] after:mx-2 after:border after:border-gray-300  cursor-pointer ${selectedOption === 'lowPrice' ? 'text-red-500' : ''}`}
                        id='lowPrice'
                        onClick={() => handleSelectOption('lowPrice')}
                    >
                        낮은 가격순
                    </div>
                    <div
                        className={`text-[12px] cursor-pointer ${selectedOption === 'highPrice' ? 'text-red-500' : ''}`}
                        id='highPrice'
                        onClick={() => handleSelectOption('highPrice')}
                    >
                        높은 가격순
                    </div>
                </div>
            </div>
            </div>
            </div>

            {/* body */}
            <div className='w-[90%] mx-auto mt-5'>
                <div className="goods">
                    <div className="goods-wrapper w-full grid justify-center box-border">
                        <div className="goods-list mr-7 ml-3 w-full grid box-border list-none grid-cols-2">
                            {Array.isArray(articleDTO) && articleDTO.length > 0 ? (
                                articleDTO.map((item) => (
                                    <div key={item.id} className="goods-cont mb-4">
                                        <a href="#"><img src={`https://kr.object.ncloudstorage.com/kjwtest/article/s_${item.imageUrl}`} alt={item.imageId} className="goods-icn items-center max-w-[165px] h-[211px]" /></a>
                                        <span className="w-full text-base font-medium  truncate h-5 break-words inline-block line-clamp-1">
                                            {item.title}
                                        </span>
                                        <span className="text-sm  text-gray-500">{item.addr1} {item.addr2}</span>
                                        <span className="flex justify-between goods-cont_bottom"></span>
                                        <span className="text-lg font-extrabold goods-cont_price">{item.price}</span>
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm'>관련 상품이 존재하지 않습니다!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        

    );
};

export default Search;