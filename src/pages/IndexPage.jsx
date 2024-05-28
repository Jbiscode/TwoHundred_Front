// import { MainResponse } from "../api/mainApi.jsx";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import bannerImage1 from '../assets/images/banner/banner1_pc.png';
import bannerImage2 from '../assets/images/banner/banner2_pc.png';
import bannerImage3 from '../assets/images/banner/banner3_pc.png';

import categoryImage_best from '../assets/images/icon/category_bestgoods.svg';
import goodsItem from '../assets/images/goodsItem/goodsItem1.jpeg';


function IndexPage() {
    const bannerImages = [
        bannerImage1,
        bannerImage2,
        bannerImage3,
      ];
    
    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
        pauseOnHover: true,
    };

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

    const goodsList =[
        {
            value:1,
            title : '신상1',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:2,
            title : '신상2',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:3,
            title : '신상3',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:4,
            title : '신상4',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:5,
            title : '신상5',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:6,
            title : '신상6',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:7,
            title : '신상7',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:8,
            title : '신상8',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:9,
            title : '신상9',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'


        },
        {
            value:10,
            title : '신상10',
            meta : '강남구 비트캠프',
            src : goodsItem,
            price: '10,000'

        },

    ]

  return (
    <div className="main">
      <div className="flex-1">
        <Header />
      </div>    

      <div className="banner-wrapper">
      <Slide {...properties}>
          {bannerImages.map((image, index) => (
            <div key={index} className="each-slide">
              <img src={image} alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </Slide>
      </div>


      <div className="category">
        <div className="category-wrapper">
            <div className="category-list">
            {categoryList.map((category) => (
                <div key={category.value} >
                    <a href="#"><img src={category.src} alt={category.text} className="category-icn" /></a>
                    <span className="category-text">{category.text}</span>
                </div>
            ))}
            </div>
        </div>
      </div>

    <div className="newgoods-title">신규상품</div>
    
    <div className="goods">
        <div className="goods-wrapper">
            <div className="goods-list">
                {goodsList.map((item) => (
                    <div key={item.value} className="goods-cont">
                        <a href="#"><img src={item.src} alt={item.text} className="goods-icn" /></a>
                        <span className="goods-cont_title">{item.title}</span>
                        <span className="goods-cont_meta">{item.meta}</span>
                        <span className="goods-cont_bottom"></span>
                        <span className="goods-cont_price">{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
  );
}

export default IndexPage;
