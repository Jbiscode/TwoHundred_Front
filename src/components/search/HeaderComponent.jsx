import filter from '@assets/images/icon/filter.svg';
import searchStore from '../../zustand/searchStore';

const HeaderComponent = ({ orderBy, setOrderBy, totalCount, content}) => {
    const { isopenedFilter, setIsopenedFilter } = searchStore();

    //정렬 선택
    const handleOrderBy = (value) => {
        setOrderBy(value);
    };

    return (
        <div>
            <div className="w-full mx-auto">
            <div className="text-2xl">
            <div className="text-2xl px-3">
                <h3 className="inline-block m-0 text-m font-bold border-b-2 border-gray-300">
                {content ? (
                    <>
                        <span className='text-red-500'>&apos;{content}&apos;</span> 의 검색 결과
                    </>
                ) : (
                    "전체 검색 결과"
                )}
                </h3>
                <span className="ml-2 text-red-500 text-[17px]">{totalCount}</span>
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