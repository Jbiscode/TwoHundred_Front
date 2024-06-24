import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "@api";
import ReviewItemComponent from "@/components/profile/ReviewItemComponent";


const ReviewComponent = ({userId}) => {
    const [reviewStatus, setReviewStatus] = useState('SALE')
    const [reviewDTO, setReviewDTO] = useState([])
    const [page, setPage] = useState(1)
    const [pagingHTML, setPagingHTML] = useState([])
    const [isExistPrev, setIsExistPrev] = useState(false)
    const [isExistNext, setIsExistNext] = useState(false)
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();
    


    const handleReviewStatusChangeSale = () => {
        setReviewStatus('SALE')
    }
    const handleTradeStatusChangeBuy = () => {
        setReviewStatus('BUY')
    }

    useEffect(()=>{
      
        const fetch = async() => {
            try{
                const response = await instance.get(
                    `/api/v1/users/${userId}/reviews?status=${reviewStatus}&page=${page}`,
                    {withCredentials: true}
                )
                if(response.resultCode == '200'){
                    setReviewDTO(response.data.mySalesResponses)
                    setPagingHTML(response.data.pageNumList)
                    setIsExistPrev(response.data.prev)
                    setIsExistNext(response.data.next)
                    setPrevPage(response.data.prevPage)
                    setNextPage(response.data.nextPage)
                }
            }catch(error){
                 console(error)
            }
        }
        fetch();
    },[reviewStatus])
    

    return (
            <div>
                <p className="font-bold pt-4 mb-3">거래 후기</p>
                <div>
                    <div className="w-full flex border-solid border-t-2 border-black text-lg">
                        <div className="w-1/2 "><p className={`block w-full text-center py-3 text-base font-bold border-solid border-b-2 ${reviewStatus === 'SALE' ? 'border-black' : 'border-gray-300'}`} onClick={handleReviewStatusChangeSale}>판매 후기</p></div>
                        <div className="w-1/2 "><p className={`block w-full text-center py-3 text-base font-bold border-solid border-b-2 ${reviewStatus === 'BUY' ? 'border-black' : 'border-gray-300'}`} onClick={handleTradeStatusChangeBuy}>구매 후기</p></div>
                    </div>
                </div>
                <div>
                    {
                        reviewDTO.map(item => (
                            <ReviewItemComponent item={item} reviewStatus={reviewStatus} key={item}/>
                        ))
                    }
                </div>
                <div className="flex justify-center mt-3">
                    <div className="flex gap-2">
                        {isExistPrev && <span onClick={() => {setPage(prevPage)}}>이전</span>}
                        {
                        pagingHTML.map(item => (
                            <span className={item == page ? "text-orange-600 font-bold" : ""} key={item} onClick={()=> setPage(item)}>{item}</span>
                        ))
                        }
                        {isExistNext && <span onClick={() => {setPage(nextPage)}}>다음</span>}
                    </div>
                </div>
            </div> 
    )
}

export default ReviewComponent