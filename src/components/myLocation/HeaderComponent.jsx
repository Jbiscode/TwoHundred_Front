import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { instance } from '@api/index';
import filter from '@assets/images/icon/filter.svg';
import searchStore from '../../zustand/searchStore';
import useAuthStore from "@zustand/authStore";

const HeaderComponent = () => {
    const {
        category, tradeMethod, tradeStatus,
        isopenedFilter, setIsopenedFilter,
        orderBy, setOrderBy
    } = searchStore();

    const { id } = useAuthStore();

    //검색결과 총 개수
    const [totalCount, setTotalCount] = useState(0);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('content');
    const [content, setContent] = useState(query || '');

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('content');
        setContent(query || '');
    }, [location.search, setContent])

    //정렬 선택
    const handleOrderBy = (value) => {
        setOrderBy(value);
    };

    useEffect(() => {
        if (query !== content) {
            setContent(query || '');
        }
    }, [query]);

    const fetchArticles = async (reset = false) => {
        let url = `/api/v1/search/myTotal`;
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
        if (tradeStatus == 'ON_SALE') {
            params.push(`tradeStatus=${tradeStatus}`);
        }
        if (id ) {
            params.push(`id=${id}`);
        }
    
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
    
        try {
            const response = await instance.get(url);
            const data = response.data;
            if (typeof data === 'number') {
                setTotalCount(data);
            } else {
                console.error('Expected an array but got:', data);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles(true);
    }, [content, orderBy, tradeMethod, tradeStatus]);

    return (
        <div>
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
        </div>
    );
};

export default HeaderComponent;