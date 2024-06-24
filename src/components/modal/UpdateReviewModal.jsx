import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import REVIEW_GOOD from "@/assets/images/review_good.svg"
import REVIEW_BAD from "@/assets/images/review_bad.svg"
import REVIEW_SOSO from "@/assets/images/review_soso.svg"
import REVIEW_GOOD_CHECKED from "@/assets/images/review_good_checked.svg"
import REVIEW_BAD_CHECKED from "@/assets/images/review_bad_checked.svg"
import REVIEW_SOSO_CHECKED from "@/assets/images/review_soso_checked.svg"
import {instance} from "@api/index"
import usemyprofileStore from "@zustand/myprofileStore"
import toast from "react-hot-toast";
import {auth} from "@api/index"
import useModalStore from "@zustand/modalStore";
const UpdateReviewModal = () => {
    const [reviewGrade , setReviewGrade] = useState({
        bad : false,
        soso : false,
        good : false
    })
    const [charCount, setCharCount] = useState(0)
    const {selectReviewId,updateMyProfileInfo} = usemyprofileStore(state => state)
    const [reviewDTO, setReviewDTO] = useState({})
    const [reviewScore , SetReviewScore] = useState()
    const {bad, soso, good} = reviewGrade
    const {closeUpdateReviewModal} = useModalStore(state => state)
    

    // 수정
    const [reviewContent, setReviewContent] = useState('')
    const [requestDTO, setRequestDTO] = useState({
        articleId : selectReviewId,
        reviewGrade : '',
        reviewContent : '',
        score : ''
    })

    useEffect(()=>{
        setRequestDTO({
            ...requestDTO,
            reviewGrade : Object.keys(reviewGrade).find(key => reviewGrade[key]),
            reviewContent : reviewContent,
            score : reviewScore
        })

    },[reviewContent,reviewGrade,reviewScore])

    const handleClickBad = () => {
        setReviewGrade({ bad: true, soso: false, good: false });
        SetReviewScore(-1)
    };

    const handleClickSoso = () => {
        setReviewGrade({ bad: false, soso: true, good: false });
        SetReviewScore(0)
    };

    const handleClickGood = () => {
        setReviewGrade({ bad: false, soso: false, good: true });
        SetReviewScore(1)
    };

    const handleSelectGrade = (score) => {
        if(score == -1) setReviewGrade({ bad: true, soso: false, good: false });
        else if(score == 0) setReviewGrade({ bad: false, soso: true, good: false });
        else if(score == 1) setReviewGrade({ bad: false, soso: false, good: true });
    }
      

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
                    console.log(response.data)
                    setReviewDTO(response.data)
                    setCharCount(response.data.content.length)
                    setReviewContent(response.data.content)
                    SetReviewScore(response.data.score)
                    const score = response.data.score
                    handleSelectGrade(score)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch();
    },[])

    const updateReviewhandler = () => {
        const fetch = async() => {
            try{
                const response = await auth.put(
                    `/api/v1/reviews/${selectReviewId}`,
                    {
                        withCredentials: true,
                        body : JSON.stringify(requestDTO)
                    }
                )
                if(response.resultCode == '200'){
                    console.log(response.data)
                    toast.success("리뷰를 수정했습니다.")
                    updateMyProfileInfo();
                    closeUpdateReviewModal();
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch();
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
                <form action="" onSubmit={(e) => {e.preventDefault}}>
                    <div className="flex justify-between mb-5">
                       <div className="grow flex justify-center" onClick={handleClickBad}>
                            <img src={requestDTO.score == -1 ? REVIEW_BAD_CHECKED : REVIEW_BAD} data-reviewgrade='bad'/>
                       </div>
                       <div className="grow flex justify-center" onClick={handleClickSoso}>
                            <img src={requestDTO.score == 0 ? REVIEW_SOSO_CHECKED : REVIEW_SOSO} data-reviewgrade='soso'/>
                       </div>
                       <div className="grow flex justify-center" onClick={handleClickGood}>
                            <img src={requestDTO.score == 1 ? REVIEW_GOOD_CHECKED : REVIEW_GOOD} data-reviewgrade='good'/>
                       </div>
                    </div>
                    <div className="mb-8">
                        <textarea placeholder="상대방에게 거래 후기를 작성해주세요!" maxLength={100} value={reviewContent} className="placeholder:text-base w-full min-h-64 border-solid border-black border p-5 text-base" name="" id="" onChange={(e) => {setReviewContent(e.target.value); setCharCount(e.target.value.length)}}>
                            
                        </textarea>
                        <p className="text-base font-bold text-end">{charCount} / 100</p>
                    </div>
                </form>
                <div className="flex justify-around">
                    <button className="btn btn-accent" onClick={updateReviewhandler}>수정하기</button>
                </div>
            </div>
            
        </div>          
    )
}

export default UpdateReviewModal;
