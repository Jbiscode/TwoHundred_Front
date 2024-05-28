import React from 'react';

const SearchPageHeader = () => {
    return (
        <div className="result-header">
          <div className="result-title">
            {/* <h3>{`"${title || ''}" 의 검색결과`}</h3> */}
            <h3>------의 검색 결과</h3>
            {/* <span>{title ? goodsList.length : 0}</span> */}
            <span>30</span>
          </div>
          <div className="result-filter-wrapper">
            <div className="result-filter">
              <div
                className="result-filter_btn"
                // onClick={() => setIsopenedFilter(!isopenedFilter)}
                >
                <span>필터</span>
                {/* <IconButton
                  className="result-filter_btn-icon"
                  src={FILTER}
                  alt="필터"
                  onClick={() => {
                    // console.log('필터')
                  }}
                /> */}
              </div>
            </div>
            <div className="result-filter_sort">
              <div className="result-filter_sort-item recent active">
                최신순
              </div>
              <div className="result-filter_sort-item price-low">
                낮은 가격순
              </div>
              <div className="result-filter_sort-item price-high">
                높은 가격순
              </div>
            </div>
          </div>
        </div>
    );
};

export default SearchPageHeader;