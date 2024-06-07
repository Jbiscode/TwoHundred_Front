import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CLOTHES from "@/assets/images/clothes.png"
import useAuthStore from "@zustand/authStore"
import {auth} from "@api/index"


const SaleComponent = () => {
    const [tradeStatus, setTradeStatus] = useState('ON_SALE')
    const [page, setPage] = useState(1)
    const [pagingHTML, setPagingHTML] = useState([])
    const [mySalesDTO, setMySalesDTO] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            // 로그인이 필요한 정보받아오기
            try{
                const response = await auth.get(
                    `/api/v1/users/me/${tradeStatus}?page=${page}`,
                    {withCredentials: true}
                )
            if(response.resultCode == '401'){
                setIsModalOpen(true)
            }
            if(response.resultCode == '200'){
                console.log(response.data.content)
                setMySalesDTO(response.data.content)
                setPagingHTML(Array.from({length : response.data.totalPages},(_, index) => index+1))
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();
        console.log(pagingHTML)
    },[page])

    return (
        <div>
            <p className="font-bold pt-4 mb-3">판매 상품</p>
            <div>
                <div className="w-full flex border-solid border-t-2 border-black text-lg">
                    <div className="w-1/2 "><Link className="block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-black">판매중</Link></div>
                    <div className="w-1/2 "><Link className="block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-gray-300">판매완료</Link></div>
                </div>
            </div>
            <div className="flex text-base font-bold justify-end my-4 gap-2 items-center">
                <p>최신순</p>
                <p>|</p>
                <p>낮은 가격순</p>
                <p>|</p>
                <p>높은 가격순</p>
            </div>
            <div className="flex flex-wrap -mx-2">
                {
                    mySalesDTO.map(item => (
                        <div className="w-1/2 px-2 mb-4">
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
            <div>
               
                {
                pagingHTML.map(item => (
                    <span className={item == page ? "text-orange-600 font-bold" : ""} key={item} onClick={()=> setPage(item)}>{item}</span>
                ))
                }
            </div>
        </div>
    )
}

export default SaleComponent