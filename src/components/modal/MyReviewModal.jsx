import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import REVIEW_GOOD from "@/assets/images/review_good.svg"
import REVIEW_BAD from "@/assets/images/review_bad.svg"
import REVIEW_SOSO from "@/assets/images/review_soso.svg"
import REVIEW_GOOD_CHECKED from "@/assets/images/review_good_checked.svg"
import REVIEW_BAD_CHECKED from "@/assets/images/review_bad_checked.svg"
import REVIEW_SOSO_CHECKED from "@/assets/images/review_soso_checked.svg"
import {instance, auth} from "@api/index"
import usemyprofileStore from "@zustand/myprofileStore"
import useModalStore from "@zustand/modalStore";
import toast from "react-hot-toast";

const MyReviewModal = () => {
    const [reviewGrade , setReviewGrade] = useState({
        bad : false,
        soso : false,
        good : false
    })
    const [charCount, setCharCount] = useState(0)
    const {selectReviewId} = usemyprofileStore(state => state)
    const [reviewDTO, setReviewDTO] = useState({})
    const {closeReviewModal,openUpdateReviewModal} = useModalStore(state => state)
    const {updateMyProfileInfo} = usemyprofileStore(state => state)

    const {bad, soso, good} = reviewGrade

      

    useEffect(()=> {
        const fetch = async() => {
            try{
                const response = await instance.get(
                    `/api/v1/reviews/${selectReviewId}`,
                    {
                        withCredentials: true
                    }
                )
                if(response.resultCode == '200'){
                    setReviewDTO(response.data)
                    setCharCount(response.data.content.length)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch();
    },[])

    const handleUpdateReviewBtn = () => {
        closeReviewModal();
        openUpdateReviewModal();
    }

    const handleDeleteReviewBtn = () => {
        const fetch = async() => {
            try{
                const response = await auth.delete(
                    `/api/v1/reviews/${selectReviewId}`,
                    {
                        withCredentials: true
                    }
                )
                if(response.resultCode == '200'){
                    console.log(response.data)
                    toast.success("리뷰를 삭제했습니다.")
                    closeReviewModal();
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch();
        updateMyProfileInfo();
        closeReviewModal();
    }



    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <div className="flex justify-center mb-3">
                    <p className="text-xl font-bold text-orange-500">{reviewDTO.revieweeName}</p>
                    <p className="text-xl">님에게 작성한 후기</p>
                </div>
                <div className="p-1 mx-6 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link to={`/post/${reviewDTO.articleId}`}>거래상품 | {reviewDTO.articleTitle}</Link></div>
            </div>
            <div className="p-5">
                <form action="">
                    <div className="flex justify-between mb-5">
                       <div className="grow flex justify-center">
                            <img src={reviewDTO.score == -1 ? REVIEW_BAD_CHECKED : REVIEW_BAD} data-reviewgrade='bad'/>
                       </div>
                       <div className="grow flex justify-center">
                            <img src={reviewDTO.score == 0 ? REVIEW_SOSO_CHECKED : REVIEW_SOSO} data-reviewgrade='soso'/>
                       </div>
                       <div className="grow flex justify-center">
                            <img src={reviewDTO.score == 1 ? REVIEW_GOOD_CHECKED : REVIEW_GOOD} data-reviewgrade='good'/>
                       </div>
                    </div>
                    <div className="mb-8">
                        <textarea placeholder="상대방에게 거래 후기를 작성해주세요!" value={reviewDTO.content} className="placeholder:text-base w-full min-h-64 border-solid border-black border p-5 text-base" name="" id="">
                            
                        </textarea>
                        <p className="text-base font-bold text-end">{charCount} / 100</p>
                    </div>
                </form>
                <div className="flex justify-around">
                    <button className="btn btn-accent" onClick={handleUpdateReviewBtn}>수정하기</button>
                </div>
            </div>
            
        </div>          
    )
}

export default MyReviewModal;
