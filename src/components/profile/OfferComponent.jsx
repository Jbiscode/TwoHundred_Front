import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CLOTHES from "@/assets/images/clothes.png"
import useAuthStore from "@zustand/authStore"
import {auth} from "@api/index"
import useModalStore from "@zustand/modalStore"


const OfferComponent = ({updateMyProfileInfo }) => {
    const {openLoginModal} = useModalStore(state => state)

    const [sortBy, setSortBy] = useState('latest')
    const [tradeStatus, setTradeStatus] = useState('ON_SALE')
    const [page, setPage] = useState(1)
    const [pagingHTML, setPagingHTML] = useState([])
    const [mySalesDTO, setMySalesDTO] = useState([])
    const [isExistPrev, setIsExistPrev] = useState(false)
    const [isExistNext, setIsExistNext] = useState(false)
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [like, setLike] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            // 로그인이 필요한 정보받아오기
            try{
                const response = await auth.get(
                    `/api/v1/users/me/offers/${tradeStatus}/${sortBy}?page=${page}`,
                    {withCredentials: true}
                )
            if(response.resultCode == '401'){
                openLoginModal()
            }
            if(response.resultCode == '200'){
                setMySalesDTO(response.data.mySalesResponses)
                setPagingHTML(response.data.pageNumList)
                setIsExistPrev(response.data.prev)
                setIsExistNext(response.data.next)
                setPrevPage(response.data.prevPage)
                setNextPage(response.data.nextPage)
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();
    },[page,tradeStatus,sortBy,like])

    const handleTradeStatusChangeSoldOut = () => {
        setTradeStatus('SOLD_OUT')
        setPage(1)
    }

    const handleTradeStatusChangeOnSale = () => {
        setTradeStatus('ON_SALE')
        setPage(1)
    }

    const handleSortChangeLatest = () => {
        setSortBy('latest')
        setPage(1)
    }

    const handleSortChangelowprice = () => {
        setSortBy('low-price')
        setPage(1)
    }

    const handleSortChangehighprice = () => {
        setSortBy('high-price')
        setPage(1)
    }

    const handleLikeChange = (id) => {
        console.log('왜 안눌리누?')
        console.log(id)
        const fetch = async() => {
            try{
                const response = await auth.put(
                    `/api/v1/users/me/likes/${id}`,
                    {withCredentials: true}
                )
                if(response.resultCode == '401'){
                    openLoginModal()
                }
                if(response.resultCode == '200'){
                    console.log("click")
                    setLike(prev => !prev)
                    updateMyProfileInfo();
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch()
    }


    return (
        <div>
            <p className="font-bold pt-4 mb-3">가격 제안</p>
            <div>
                <div className="w-full flex border-solid border-t-2 border-black text-lg">
                <div className="w-full"><p className={`block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-black`} >가격 제안</p></div>
                </div>
            </div>
            <div className="flex text-base font-bold justify-end my-4 gap-2 items-center">
                <p onClick={handleSortChangeLatest} className={sortBy === 'latest' ? 'text-orange-600' : ''}>최신순</p>
                <p>|</p>
                <p onClick={handleSortChangelowprice} className={sortBy === 'low-price' ? 'text-orange-600' : ''}>낮은 가격순</p>
                <p>|</p>
                <p onClick={handleSortChangehighprice} className={sortBy === 'high-price' ? 'text-orange-600' : ''}>높은 가격순</p>
            </div>
            <div className="flex flex-wrap -mx-2">
                {
                    mySalesDTO.map(item => (
                        <div className="w-1/2 px-2 mb-4" key={item.id}>
                            <div className="relative">
                                <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${item.thumbnailUrl}`} />
                                {
                                        item.tradeStatus === 'SOLD_OUT' &&
                                        <div className="text-lg text-white flex justify-center items-center w-full h-full absolute bg-black/30 top-0">
                                            거래 완료
                                        </div>
                                }
                                <img className="absolute top-2 right-2" src={`/src/assets/images/icon/${item.isLiked === true ? 'heart_fill.svg' : 'heart_blank.svg'}`} onClick={()=>{handleLikeChange(item.id)}}/>
                            </div>
                            <p className="text-[16px] whitespace-nowrap text-ellipsis overflow-hidden font-bold my-2">{item.title}</p>
                            <div className="my-2 flex text-sm gap-1 font-bold text-gray-400">
                                <p>{`${item.addr1} ${item.addr2}`}</p>
                                <p>|</p>
                                <p>{item.timeAgo}</p>
                            </div>
                            <div className="text-lx font-bold">{item.price.toLocaleString()}원</div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center">
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

export default OfferComponent