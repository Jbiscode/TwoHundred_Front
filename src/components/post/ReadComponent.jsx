function ReadComponent() {
    return (
        <div className="mx-auto w-fit bg-white py-8 px-10">
            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <div className="flex gap-10 flex-col md:flex-row m-auto md:m-0">
                    <img src="https://avatars.githubusercontent.com/u/117346967?v=4" alt="프로필"
                         className="w-[300px] aspect-square"/>
                    <div className="w-[300px]">
                        <div className="flex items-center">
                            <img src="https://avatars.githubusercontent.com/u/117346967?v=4" alt="프로필"
                                 className="w-[50px] h-[50px] rounded-full mr-4"/>
                            <h1 className="text-4xl text-[#EFA43D] mt-5 mb-5">오렌지 미쳐따</h1>
                        </div>
                        <hr className="mt-4"/>
                        <ul className="space-y-2 mt-4 mb-10">
                            <li><i className="fas fa-envelope text-gray-400 mr-1"></i> 싱싱한 오렌지 팔아요</li>
                            <li><i className="fas fa-phone text-gray-400 mr-1"></i>4000원</li>
                            <li><p className="text-gray-400 text-sm">작성 시간 1시간 전</p></li>
                            <li><p className="text-gray-400 text-sm">거래 지역 동작구 사당동</p></li>
                            <li><p className="text-gray-400 text-sm">상품 상태 새 상품</p></li>
                            <li><p className="text-gray-400 text-sm">거래 방식 직거래</p></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-white p-5 flex-wrap gap-10">
                <div className="flex gap-10 flex-col md:flex-row m-auto md:m-0">
                    <div className="w-[300px]">
                        <h1 className="text-4xl text-black md:mt-10 mb-4">상품 정보 </h1>
                        <hr className="border-2 border-black"/>
                        <p className="space-y-2 mt-4 mb-10">맛도 좋고 </p>
                    </div>
                    <div className="w-[300px]">
                        <h1 className="text-4xl text-black md:mt-10 mb-4">가격 제안 </h1>
                        <hr className="border-2 border-black"/>
                        <ul className="space-y-2 mt-4 mb-10">
                            <li className="flex justify-between items-center">
                                <div>
                                    <p className="text-black">싱싱한 오렌지 팔아요</p>
                                    <p className="text-gray-400 text-sm">동작구 사당동 | 1시간 전</p>
                                </div>
                                <p className="text-black">500원</p>
                            </li>
                            <hr/>
                            <li className="flex justify-between items-center">
                                <div>
                                    <p className="text-black">싱싱한 오렌지 팔아요</p>
                                    <p className="text-gray-400 text-sm">동작구 사당동 | 1시간 전</p>
                                </div>
                                <p className="text-black">500원</p>
                            </li>
                            <hr/>
                        </ul>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-ghost bg-orange-400 text-white mb-10">
                                거래 제안하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;