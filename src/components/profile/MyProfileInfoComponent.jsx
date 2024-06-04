import React from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"

const MyProfileInfoComponent = () => {

    return (
            <div className="border w-full border-gray-300 px-6 py-10 border-solid mt-8 mb-8">
                <div className="flex">
                    <div className="w-1/3 flex justify-center items-center">
                        <img src={PROFILE_IMAGE} className="w-20 h-20 rounded-full"/>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">히텧</p>
                        <p className="text-orange-500 text-base font-semibold">Level 1</p>
                        <p className="text-gray-400 text-base font-semibold">동작구 사당동</p>
                    </div>
                </div>
                <div className="divider divider-default"></div>
                <div className="flex justify-around text-center font-bold ">
                    <div>
                        <p className="text-lg mb-1">판매 상품</p>
                        <p className="text-lg">30</p>
                    </div>
                    <div>
                        <p className="text-lg mb-1">찜한 상품</p>
                        <p className="text-lg">30</p>
                    </div><div>
                        <p className="text-lg mb-1">가격 제안</p>
                        <p className="text-lg">30</p>
                    </div><div>
                        <p className="text-lg mb-1">구매 내역</p>
                        <p className="text-lg">30</p>
                    </div>
                </div>
            </div>
    )
}

export default MyProfileInfoComponent;