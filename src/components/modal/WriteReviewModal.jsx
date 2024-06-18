import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import REVIEW_GOOD from "@/assets/images/review_good.svg"
import REVIEW_BAD from "@/assets/images/review_bad.svg"
import REVIEW_SOSO from "@/assets/images/review_soso.svg"
import REVIEW_GOOD_CHECKED from "@/assets/images/review_good_checked.svg"
import REVIEW_BAD_CHECKED from "@/assets/images/review_bad_checked.svg"
import REVIEW_SOSO_CHECKED from "@/assets/images/review_soso_checked.svg"
import useModalStore from "@zustand/modalStore"
import {auth, instance} from "@api/index"
import usemyprofileStore from "@zustand/myprofileStore";

const WriteReviewModal = () => {
    const { isLoginModalOpen, isSignupModalOpen, isWriteReviewModalOpen, openLoginModal,closeLoginModal, closeSignupModal,closeWriteReviewModal } = useModalStore();
    const {selectReviewId} = usemyprofileStore(state => state)
    const [charCount, setCharCount] = useState(0)
    const [reviewGrade, setReviewGrade] = useState({
        bad: false,
        soso: false,
        good: false
    });

 
    const [reviewContent, setReviewContent] = useState('')
    const navigate = useNavigate();

    const [articleDTO, setArticleDTO] = useState({})

    const [requestDTO, setRequestDTO] = useState({
        articleId : selectReviewId,
        reviewGrade : '',
        reviewContent : ''
    })
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await instance.get(
                    `/api/v1/articles/${selectReviewId}`,
                    {
                        withCredentials: true
                    }
                )
            if(response.resultCode == '401'){
                openLoginModal()
            }
            if(response.resultCode == '200'){
                console.log(response.data)
                setArticleDTO(response.data)
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();
    },[])

    const handleClickLink = () => {
        closeWriteReviewModal();
        navigate(`/post/${selectReviewId}`)
    }

    useEffect(()=>{
        setRequestDTO({
            ...requestDTO,
            reviewGrade : Object.keys(reviewGrade).find(key => reviewGrade[key]),
            reviewContent : reviewContent
        })

    },[reviewContent,reviewGrade])
    

    const handleClickBad = () => {
        setReviewGrade({ bad: true, soso: false, good: false });
    };

    const handleClickSoso = () => {
        setReviewGrade({ bad: false, soso: true, good: false });
    };

    const handleClickGood = () => {
        setReviewGrade({ bad: false, soso: false, good: true });
    };

    // review 작성
    const handleSubmitReview = () => {
        const fetchData = async () => {
            // 로그인이 필요한 정보받아오기
            try{
                const response = await auth.post(
                    `/api/v1/reviews/${selectReviewId}`,
                    {
                        withCredentials: true,
                        body : JSON.stringify(requestDTO)
                    },
                    
                )
            if(response.resultCode == '401'){
                openLoginModal()
            }
            if(response.resultCode == '200'){
                closeWriteReviewModal()
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();
    }

    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <div className="flex justify-center mb-3">
                    <p className="text-xl font-bold text-orange-500">{articleDTO.writerUsername}</p>
                    <p className="text-xl">님과의 거래는 어떠셨나요?</p>
                </div>
                <div className="p-1 mx-6 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><p onClick={handleClickLink}>거래상품 | {articleDTO.title}</p></div>
            </div>
            <div className="p-5">
                <form action="">
                    <div className="flex justify-between mb-5">
                        <div className="grow flex justify-center" onClick={handleClickBad}>
                            <img src={reviewGrade.bad ? REVIEW_BAD_CHECKED : REVIEW_BAD} />
                        </div>
                        <div className="grow flex justify-center" onClick={handleClickSoso}>
                            <img src={reviewGrade.soso ? REVIEW_SOSO_CHECKED : REVIEW_SOSO} />
                        </div>
                        <div className="grow flex justify-center" onClick={handleClickGood}>
                            <img src={reviewGrade.good ? REVIEW_GOOD_CHECKED : REVIEW_GOOD} />
                        </div>
                    </div>
                    <div className="mb-8">
                        <textarea placeholder="상대방에게 거래 후기를 작성해주세요!" className="placeholder:text-base w-full min-h-64 border-solid border-black border p-5 text-base" name="" id="" onChange={(e) => {setReviewContent(e.target.value); setCharCount(e.target.value.length)}}></textarea>
                        <p className="text-base font-bold text-end">{charCount} / 100</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="btn btn-primary w-3/5 text-lg mb-3 font-bold" onClick={handleSubmitReview}>거래후기 남기기</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WriteReviewModal;
