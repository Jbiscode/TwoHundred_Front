import React, { useEffect, useRef, useState } from 'react';
import filter from '@assets/images/icon/filter.svg';



const Search = () => {

    const [articleDTO, setArticleDTO] = useState({
        id : '',
        category : '',
        title: '',
        content : '',
        price : '',
        tradeMethod : '',
        createDate : '',
        addr1 : '',
        addr2 : '',
    });

    const {id, category, title, content, price, tradeMethod, createDate, addr1, addr2} = articleDTO

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/search')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched categories:', data); // 로그 추가

                if (Array.isArray(data)) {
                    setArticleDTO(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);
    

    const categoryCode = [
        {
            id : '가전 제품',
            value : false,
            htmlFor: '가전 제품',
            key: 1,
        },
        {
            id : '무료 나눔',
            value : false,
            htmlFor: '무료 나눔',
            key: 2,
        },
        {
            id : '여성 잡화',
            value : false,
            htmlFor: '여성 잡화',
            key: 3,
        },
        {
            id : '남성 잡화',
            value : false,
            htmlFor: '남성 잡화',
            key: 4,
        },
        {
            id : '스포츠 / 레저',
            value : false,
            htmlFor: '스포츠 / 레저',
            key: 5,
        },
        {
            id : '반려동물 용품',
            value : false,
            htmlFor: '반려동물 용품',
            key: 6,
        },
        {
            id : '뷰티 / 미용',
            value : false,
            htmlFor: '뷰티 / 미용',
            key: 7,
        }
    ]

    const tradeMethodCode = [
        {
            htmlFor: '상관없음',
            key: 2,
            value: false,
            id: '상관없음'  
        },
        {
            htmlFor: '직거래',
            key: 2,
            value: false,
            id: '직거래'
        },
        {
            htmlFor: '택배 거래',
            key: 2,
            value: false,
            id: '택배 거래'
        }
    ]

    //카테고리 선택
    const [selectedCategory, setSelectedCategory] = useState(null);

   
    const handleSelectCategory = (item) => {
        setSelectedCategory(item.id);
    };
    
    //거래방식 선택
    const [selectedtrade, setSelectedtrade] = useState(null);

    
    const handleSelectedtrade = (item) => {
        setSelectedtrade(item.id); 
    };

    //정렬
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectOption = (option) => {
        setSelectedOption(option);
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
                                <>
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
                                        key={item.key}
                                        value={item.value}
                                        onClick={() => handleSelectCategory(item)}>
                                        {item.id}
                                    </label>
                                </div>
                                </>
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
                                                key={item.key}
                                                value={item.value}
                                                onClick={() => handleSelectedtrade(item)}>
                                                <span className='text-sm'
                                                >{item.id}</span>
                                            </label>
                                        </div> 
                                    ))}
                                    
                                </div>
                            </div>

                            {/* 가격 */}
                            <div className="px-8 pt-10">
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
                            </div>

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
            <div className="w-[90%] mx-auto">
            <div className="text-2xl">
            <div className="text-2xl">
                {/* <h3>{`"${title || ''}" 의 검색결과`}</h3> */}
                <h3 className="inline-block m-0 text-m font-bold border-b-2 border-gray-300">
                    "------"의 검색 결과
                </h3>

                {/* <span>{title ? goodsList.length : 0}</span> */}
                <span className="ml-2 text-red-500 text-[20px]">30</span>
            </div>
            <div className="mt-2 w-full flex justify-between items-center">
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
                        onClick={() => handleSelectOption('latest')}
                    >
                        최신순
                    </div>
                    <div
                        className={`text-[12px] after:content-[''] after:mx-2 after:border after:border-gray-300  cursor-pointer ${selectedOption === 'lowPrice' ? 'text-red-500' : ''}`}
                        onClick={() => handleSelectOption('lowPrice')}
                    >
                        낮은 가격순
                    </div>
                    <div
                        className={`text-[12px] cursor-pointer ${selectedOption === 'highPrice' ? 'text-red-500' : ''}`}
                        onClick={() => handleSelectOption('highPrice')}
                    >
                        높은 가격순
                    </div>
                    </div>
            </div>
            </div>
            </div>

            {/* body */}
            <div className='w-[90%] mx-auto'>
                <div className="">
                    상품
                </div>
            </div>
        </div>
        

    );
};

export default Search;