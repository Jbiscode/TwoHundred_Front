import { useEffect } from 'react';
import searchStore from '../../zustand/searchStore';
import { categoryCode, tradeMethodCode, tradeStatusCode } from '@utils/useFillterCode';

const FilterComponent = ({category, setCategory, tradeMethod, setTradeMethod, tradeStatus, setTradeStatus}) => {
    const { isopenedFilter, setIsopenedFilter } = searchStore();

    useEffect(() => {
        const initialCategory = new URLSearchParams(location.search).get('category') || location.state?.category || null;
        setCategory(initialCategory);
    }, [setCategory]);


    //카테고리 선택
    const handleCategory = (item) => {
        setCategory(item.id);
    };
    
    //거래방식 선택
    const handleTradeMethod = (item) => {
        setTradeMethod(item.id);
    };

    //거래상태 선택
    const handleTradeStatus = (item) => {
        if(setTradeStatus(item.id) == 'ALL') {return;}
        setTradeStatus(item.id);
    };
    
    const handleFilter = () => {
        setIsopenedFilter(!isopenedFilter);
    };

    const handleReset = () => {
        setCategory(null);
        setTradeMethod(null);
        setTradeStatus(null);
    };


    return (
        <div>
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

                                {/* 거래 상태 */}
                                <div className="px-8 pt-10">
                                    <h3 className="font-bold pb-4 text-lg border-b-2 border-solid">거래상태</h3>
                                    <div className="flex flex-col space-y-4 mt-4">             
                                        {tradeStatusCode.map((item) => (
                                            <div key={item.id} className={tradeStatus === item.id ? 'text-green-700' : 'text-black'}>
                                                <label
                                                    className="flex items-center cursor-pointer"
                                                    htmlFor={item.htmlFor}
                                                    onClick={() => handleTradeStatus(item)}>
                                                    <span className='text-sm'>{item.htmlFor}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
        </div>
    );
};

export default FilterComponent;