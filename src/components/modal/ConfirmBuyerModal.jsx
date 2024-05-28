import React from "react";
import { Link } from "react-router-dom";
import PROFILE_IMAGE from "@/assets/images/sorage.png"

const ConfirmBuyerModal = () => {
    return (
        <div>
            <div className="text-center font-bold text-lg mb-6">
                <p className="text-2xl mb-2">구매자를 확정해주세요!</p>
                <p className="text-base text-gray-400 font-medium mb-5">판매 완료는 반드시 구매자를 확정해야 합니다!</p>
                <div className="p-1 mx-6 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link>거래상품 | 잠이 오는 보약 새 상품</Link></div>
            </div>
            <div className="p-5">
                <form action="">
                    <div className="border-solid border-t border-gray-300 mb-8">
                        <div className="flex pt-5 pb-5 border-solid border-b border-gray-300">
                            <div className="w-1/3 flex justify-center items-center">
                                <img src={PROFILE_IMAGE} className="w-16 h-16 rounded-full"/>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <p className="font-bold">비드앤바이</p>
                                    <p className="text-orange-500 text-base font-semibold">Lv. 1</p>
                                </div>
                                <p className="font-bold text-lg mb-1">제안 가격 9,999원</p>
                                <div className="flex gap-1">
                                    <p className="text-gray-400 text-base font-semibold">동작구 사당동</p>
                                    <p className="text-gray-400 text-base font-semibold">&#183;</p>
                                    <p className="text-gray-400 text-base font-semibold">1시간 전</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-5 pb-5 border-solid border-b border-gray-300">
                            <div className="w-1/3 flex justify-center items-center">
                                <img src={PROFILE_IMAGE} className="w-16 h-16 rounded-full"/>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <p className="font-bold">비드앤바이</p>
                                    <p className="text-orange-500 text-base font-semibold">Lv. 1</p>
                                </div>
                                <p className="font-bold text-lg mb-1">제안 가격 9,999원</p>
                                <div className="flex gap-1">
                                    <p className="text-gray-400 text-base font-semibold">동작구 사당동</p>
                                    <p className="text-gray-400 text-base font-semibold">&#183;</p>
                                    <p className="text-gray-400 text-base font-semibold">1시간 전</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-primary w-3/5 text-lg mb-3 font-bold">구매자 확정</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default ConfirmBuyerModal;
