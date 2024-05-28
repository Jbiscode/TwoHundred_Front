import React, { useState } from "react";
import { Link } from "react-router-dom";
import REVIEW_GOOD from "@/assets/images/review_good.svg"
import REVIEW_BAD from "@/assets/images/review_bad.svg"
import REVIEW_SOSO from "@/assets/images/review_soso.svg"
import REVIEW_GOOD_CHECKED from "@/assets/images/review_good_checked.svg"
import REVIEW_BAD_CHECKED from "@/assets/images/review_bad_checked.svg"
import REVIEW_SOSO_CHECKED from "@/assets/images/review_soso_checked.svg"

const WriteReviewModal = () => {
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
                    <p className="text-xl">님과의 거래는 어떠셨나요?</p>
                </div>
                <div className="p-1 mx-6 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link>거래상품 | 잠이 오는 보약 새 상품</Link></div>
            </div>
            <div className="p-5">
                <form action="javascript:void(0)">
                    <div className="flex justify-between mb-5" onClick={handleClickGrade}>
                       <div className="grow flex justify-center">
                            <img src={bad ? REVIEW_BAD_CHECKED : REVIEW_BAD} data-reviewgrade='bad'/>
                       </div>
                       <div className="grow flex justify-center">
                            <img src={soso ? REVIEW_SOSO_CHECKED : REVIEW_SOSO} data-reviewgrade='soso'/>
                       </div>
                       <div className="grow flex justify-center">
                            <img src={good ? REVIEW_GOOD_CHECKED : REVIEW_GOOD} data-reviewgrade='good'/>
                       </div>
                    </div>
                    <div className="mb-8">
                        <textarea placeholder="상대방에게 거래 후기를 작성해주세요!" className="placeholder:text-base w-full min-h-64 border-solid border-black border p-5 text-base" name="" id=""></textarea>
                        <p className="text-base font-bold text-end">0 / 100</p>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-primary w-3/5 text-lg mb-3 font-bold">거래후기 남기기</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default WriteReviewModal;
