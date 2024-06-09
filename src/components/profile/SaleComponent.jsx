import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CLOTHES from "@/assets/images/clothes.png"
import useAuthStore from "@zustand/authStore"
import {auth} from "@api/index"
import useModalStore from "@zustand/modalStore"


const SaleComponent = () => {
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
    

    useEffect(()=>{
        const fetchData = async () => {
            // 로그인이 필요한 정보받아오기
            try{
                const response = await auth.get(
                    `/api/v1/users/me/${tradeStatus}/${sortBy}?page=${page}`,
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
    },[page,tradeStatus,sortBy])

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


    return (
        <div>
            <p className="font-bold pt-4 mb-3">판매 상품</p>
            <div>
                <div className="w-full flex border-solid border-t-2 border-black text-lg">
                    <div className="w-1/2 "><p className={`block w-full text-center py-3 text-base font-bold border-solid border-b-2 ${tradeStatus === 'ON_SALE' ? 'border-black' : 'border-gray-300'}`} onClick={handleTradeStatusChangeOnSale}>판매중</p></div>
                    <div className="w-1/2 "><p className={`block w-full text-center py-3 text-base font-bold border-solid border-b-2 ${tradeStatus === 'SOLD_OUT' ? 'border-black' : 'border-gray-300'}`} onClick={handleTradeStatusChangeSoldOut}>판매완료</p></div>
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
                            <div>
                            <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${item.thumbnailUrl}`} />
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
                {/* <div className="w-1/2">
                    <div>
                        <img src={`https://kr.object.ncloudstorage.com/kjwtest/${thumbnailUrl}`}/>
                    </div>
                    <p className="text-[18px] font-bold my-2">{title}</p>
                    <div className="my-2 flex text-sm gap-1 font-bold text-gray-400">
                        <p>{`${addr1} ${addr2}`}</p>
                        <p>|</p>
                        <p>${timeAgo}</p>
                    </div>
                    <div className="text-lx font-bold">{price}원</div>
                </div> */}
                {/* <div className="w-1/2">
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
                </div> */}
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

export default SaleComponent