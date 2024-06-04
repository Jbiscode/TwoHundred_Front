import React from "react";
import { Link } from "react-router-dom";
import CLOTHES from "@/assets/images/clothes.png"

const SaleComponent = () => {

    return (
        <div>
            <p className="font-bold pt-4 mb-3">판매 상품</p>
            <div>
                <div className="w-full flex border-solid border-t-2 border-black text-lg">
                    <div className="w-1/2 "><Link className="block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-black">판매중</Link></div>
                    <div className="w-1/2 "><Link className="block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-gray-300">판매완료</Link></div>
                </div>
            </div>
            <div className="flex text-base font-bold justify-end my-4 gap-2 items-center">
                <p>최신순</p>
                <p>|</p>
                <p>낮은 가격순</p>
                <p>|</p>
                <p>높은 가격순</p>
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <div>
                        <img src={CLOTHES}/>
                    </div>
                    <p className="text-[18px] font-bold my-2">Margiela wool sweat</p>
                    <div className="my-2 flex text-sm gap-1 font-bold text-gray-400">
                        <p>관악구 봉천동</p>
                        <p>|</p>
                        <p>2분 전</p>
                    </div>
                    <div className="text-lx font-bold">165,000원</div>
                </div>
                <div className="w-1/2">
                    <div className="relative">
                        <img src={CLOTHES}/>
                        <div className="text-lg text-white flex justify-center items-center w-full h-full absolute bg-black/30 top-0">
                            판매 완료
                        </div>
                    </div>
                    <p className="text-[18px] font-bold my-2">Margiela wool sweat</p>
                    <div className="my-2 flex text-sm gap-1 font-bold text-gray-400">
                        <p>관악구 봉천동</p>
                        <p>|</p>
                        <p>2분 전</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-lx font-bold">165,000원</p>
                        <div><button className="btn btn-sm btn-secondary">후기 보기</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleComponent