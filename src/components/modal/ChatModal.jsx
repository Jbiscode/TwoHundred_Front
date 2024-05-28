import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChatModal = () => {
    const [reviewGrade , setReviewGrade] = useState({
        bad : false,
        soso : false,
        good : false
    })

    const {bad, soso, good} = reviewGrade

    const handleClickGrade = (e) => {
        const grade = e.target.dataset.reviewgrade
        setReviewGrade({
            bad : false,
            soso : false,
            good : false,
            [grade] : true
        })
    }

    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <div className="flex justify-center mb-3">
                    <p className="text-xl font-bold text-orange-500">비드앤바이</p>
                    <p className="text-xl">님에게 쪽지 보내기</p>
                </div>
                <p className="text-base text-gray-400 font-medium mb-5">가격이 마음에 드셨다면 쪽지를 보내보세요!</p>
                <div className="p-1 mx-6 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link>거래상품 | 잠이 오는 보약 새 상품</Link></div>
            </div>
            <div className="p-5">
                <form action="javascript:void(0)">
                    <div className="mb-8">
                        <textarea placeholder="상대방에게 쪽지를 보내보세요!" className="placeholder:text-base w-full min-h-64 border-solid border-black border p-5 text-base" name="" id=""></textarea>
                        <p className="text-base font-bold text-end">0 / 100</p>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-primary w-3/5 text-lg mb-3 font-bold">쪽지 보내기</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default ChatModal;
