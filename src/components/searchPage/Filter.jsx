import React from 'react';



const Filter = () => {

    const price = () => {}

    return (
        <div className='filter-mask'>
            <div className="filter-container">
            <div className="filter-wrapper">
                <form
                //onSubmit={filterFormik.handleSubmit}
                method="post"
                encType="multipart/form-data">
                    <div className="filter-cont-wrapper">
                        {/* 카테고리 */}
                        <div className="filter-cont">
                        <h3 className="filter-cont_title">카테고리</h3>
                        <ul className="filter-cont_item-list category">
                            <>
                                <input
                                type="radio"
                                name="categoryCode"
                                id="name"
                                className="filter_category-btn"
                                value="code"
                                //onChange={filterFormik.handleChange}
                                />
                                <label
                                className="search-filter_category"
                                htmlFor="name"
                                key="code"
                                value="code">
                                가전 제품
                                </label>
                            </>

                            <>
                                <input
                                type="radio"
                                name="categoryCode"
                                id="name"
                                className="filter_category-btn"
                                value="code"
                                //onChange={filterFormik.handleChange}
                                />
                                <label
                                className="search-filter_category"
                                htmlFor="name"
                                key="code"
                                value="code">
                                무료 나눔
                                </label>
                            </>

                            <>
                                <input
                                type="radio"
                                name="categoryCode"
                                id="name"
                                className="filter_category-btn"
                                value="code"
                                //onChange={filterFormik.handleChange}
                                />
                                <label
                                className="search-filter_category"
                                htmlFor="name"
                                key="code"
                                value="code">
                                여성 잡화
                                </label>
                            </>

                            <>
                                <input
                                type="radio"
                                name="categoryCode"
                                id="name"
                                className="filter_category-btn"
                                value="code"
                                //onChange={filterFormik.handleChange}
                                />
                                <label
                                className="search-filter_category"
                                htmlFor="name"
                                key="code"
                                value="code">
                                전자 기기
                                </label>
                            </>
                        </ul>
                        </div>

                        {/* 거래 방식 */}
                        <div className="filter-cont">
                            <h3 className="filter-cont_title">거래방식</h3>
                            <div className="filter-cont_item-list orderway">
                                <label
                                    className="search-filter_trade-method"
                                    htmlFor="name"
                                    key="code"
                                    value="">
                                    <input
                                    type="radio"
                                    name="tradeMethodCode"
                                    id="name"
                                    className="filter_trademethod-btn"
                                    value="code"
                                    //onChange={filterFormik.handleChange}
                                    />
                                    &nbsp;&nbsp;상관 없음
                                </label>
                                <label
                                    className="search-filter_trade-method"
                                    htmlFor="name"
                                    key="code"
                                    value="">
                                    <input
                                    type="radio"
                                    name="tradeMethodCode"
                                    id="name"
                                    className="filter_trademethod-btn"
                                    value="code"
                                    //onChange={filterFormik.handleChange}
                                    />
                                    &nbsp;&nbsp;직거래
                                </label>
                                <label
                                    className="search-filter_trade-method"
                                    htmlFor="name"
                                    key="code"
                                    value="">
                                    <input
                                    type="radio"
                                    name="tradeMethodCode"
                                    id="name"
                                    className="filter_trademethod-btn"
                                    value="code"
                                    //onChange={filterFormik.handleChange}
                                    />
                                    &nbsp;&nbsp;택배거래
                                </label>
                            </div>
                        </div>

                        {/* 가격 */}
                        <div className="filter-cont">
                            <h3 className="filter-cont_title">가격</h3>
                            <div className="filter-cont_item-list">
                                <div className="filter-cont_item-input">
                                    <input 
                                        
                                        name="minPrice"
                                        placeholder="최소 가격"     
                                        className="filter_minprice-input"
                                        type="number"
                                        onChange={price}
                                    />
                                    <input id="maxPrice"
                                        name="maxPrice"
                                        placeholder="최대 가격"
                                        className="filter_maxprice-input"
                                        type="number"
                                        onChange={price}                                      
                                    />  
                                </div>
                                <p className="filter-cont_item-notice">
                                        가격은 숫자로만 입력할 수 있어요!
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="filter-btn-wrapper">
                        <button type="reset" className='filter-reset-btn'>
                            초기화
                        </button>
                        <button type="submit" className='filter-submit-btn'>
                            필터 적용
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>

    );
};

export default Filter;