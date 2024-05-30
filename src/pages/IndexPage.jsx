// import { MainResponse } from "../api/mainApi.jsx";
import { useState, useEffect } from 'react';

import bannerImage1 from '@assets/images/banner/banner1_pc.png';
import bannerImage2 from '@assets/images/banner/banner2_pc.png';
import bannerImage3 from '@assets/images/banner/banner3_pc.png';

import categoryImage_best from '@assets/images/icon/category_bestgoods.svg';
import goodsItem from '@assets/images/goodsItem/goodsItem1.jpeg';
import BasicLayout from '@layouts/BasicLayout';

function IndexPage() {
    
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (direction) => {
        if (direction === 'prev') {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
        } else {
        setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
        }
    };

    useEffect(() => {
        console.log('Current slide:', currentSlide);
      }, [currentSlide]);

    const categoryList = [
        {
          value: 1,
          text: '인기상품',
          src: categoryImage_best
        },
        {
          value: 2,
          text: '여성의류',
          src: categoryImage_best
        },
        {
          value: 3,
          text: '여성잡화',
          src: categoryImage_best
        },
        {
          value: 4,
          text: '생활 가전',
          src: categoryImage_best
        },
        {
          value: 5,
          text: '가구/인테리어',
          src: categoryImage_best
        },
        {
          value: 6,
          text: '게임/취미',
          src: categoryImage_best
        },
        {
          value: 7,
          text: '도서',
          src: categoryImage_best
        },
        {
          value: 8,
          text: '스포츠/레저',
          src: categoryImage_best
        },
    ]

    const goodsList = [
        {
            value: 1,
            title: '신상1',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 2,
            title: '신상2',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 3,
            title: '신상3',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 4,
            title: '신상4',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 5,
            title: '신상5',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 6,
            title: '신상6',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 7,
            title: '신상7',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 8,
            title: '신상8',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 9,
            title: '신상9',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
        {
            value: 10,
            title: '신상10',
            meta: '강남구 비트캠프',
            src: goodsItem,
            price: '10,000'
        },
    ]

    return (
        <BasicLayout>
            <div>
            <div className="flex flex-col">

            {/* 배너 */}
            <div className="carousel w-full" data-interval="false">
                <div className={`carousel-item relative w-full ${currentSlide === 0 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage1} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button className="btn btn-circle" onClick={() => handleSlideChange('prev')}>❮</button>
                        <button className="btn btn-circle" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
                <div className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage2} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button className="btn btn-circle" onClick={() => handleSlideChange('prev')}>❮</button>
                        <button className="btn btn-circle" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
                <div className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
                    <img src={bannerImage3} className="w-full h-[180px]" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button className="btn btn-circle" onClick={() => handleSlideChange('prev')}>❮</button>
                        <button className="btn btn-circle" onClick={() => handleSlideChange('next')}>❯</button>
                    </div>
                </div>
            </div>


            {/* 카테고리 */}
            <div className="justify-center flex-col flex-grow ">
                <div className="mt-7 mb-7  grid justify-center ">
                    <div className="category-list p-2 w-full justify-center grid grid-cols-4">
                    {categoryList.map((category) => (
                        <div key={category.value} className="grid p-1">
                            <a href="#" >
                                <img src={category.src} alt={category.text} className="m-[20px] w-12 h-[35px] items-center" />
                            </a>

                            <div className="category-text font-family[Noto Sans] text-base h-full text-center grid items-center">
                            {category.text}
                            </div>
                        </div>
                    ))}
                        </div>
                    </div>
                </div>
                
                {/* 추천상품 */}
                <div className="newgoods-title mt-30 mx-6 text-lg font-bold">추천 상품</div>
                <div className="goods">
                    <div className="goods-wrapper w-full grid justify-center box-border">
                        <div className="goods-list mr-7 ml-3 w-full grid box-border list-none  ">
                            {goodsList.map((item) => (
                                <div key={item.value} className="goods-cont ">
                                    <a href="#"><img src={item.src} alt={item.title} className="goods-icn items-center max-w-[165px] h-[211px]" /></a>
                                    <span className="w-full text-base font-medium  truncate h-5 break-words inline-block line-clamp-1">
                                        {item.title}
                                    </span>
                                    <span className="text-sm  text-gray-500">
                                        {item.meta}
                                    </span>
                                    <span className="flex justify-between goods-cont_bottom"></span>
                                    <span className="text-lg font-extrabold goods-cont_price">
                                        {item.price}
                                    </span>                
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </BasicLayout>
    );
}

export default IndexPage;
