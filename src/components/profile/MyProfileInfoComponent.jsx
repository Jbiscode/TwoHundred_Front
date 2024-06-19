import React, { useEffect, useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import useAuthStore from "@zustand/authStore"
import usemyprofileStore from "@zustand/myprofileStore"
import {auth} from "@api/index"

const MyProfileInfoComponent = () => {
    const {token, user, refreshToken} = useAuthStore()
    const {updateMyProfile, setSalesView, setLikesView, setOffersView, setBuyView, currentView} = usemyprofileStore(state => state)

    const [userDTO, setUserDTO] = useState({
        id : '',
        name : '',
        addr1 : '',
        addr2 : '',
        countBuy : '',
        countLike : '',
        countOffer : '',
        countSale : '',
        offerLevel : '',
        profileImageUrl : ''
    });

    const { id,name, addr1, addr2, countBuy, countLike, countOffer, countSale, offerLevel, profileImageUrl} = userDTO

    useEffect(()=>{
        const fetchData = async () => {
            // 로그인이 필요한 정보받아오기
            try{
                const response = await auth.get(
                    '/api/v1/users/me',
                    {withCredentials: true}
                )
            if(response.resultCode == '401'){
                setIsModalOpen(true)
                // refreshToken();
            }
            if(response.resultCode == '200'){
                setUserDTO(response.data)
                console.log(response.data)
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();
    },[updateMyProfile])


    return (
            <div className="border w-full border-gray-300 px-6 py-10 border-solid mt-8 mb-8 rounded-[10%]">
                <div className="flex gap-4">
                    <div className="avatar">
                        <div className="w-32 rounded-full border-gray-300 border-solid border-4 ">
                            <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${profileImageUrl}`} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="mb-2 font-bold">{user}</p>
                        <p className="text-orange-500 text-base font-semibold">Level {offerLevel}</p>
                        <p className="text-gray-400 text-base font-semibold">{`${addr1} ${addr2}`}</p>
                    </div>
                </div>
                <div className="divider divider-default"></div>
                <div className="flex justify-around text-center font-bold ">
                    <div>
                        <p className={`text-lg mb-1 ${currentView === 'sales' ? 'text-orange-600' : ''}`} onClick={setSalesView}>판매 상품</p>
                        <p className={`text-lg mb-1 ${currentView === 'sales' ? 'text-orange-600' : ''}`} onClick={setSalesView}>{countSale}</p>
                    </div>
                    <div>
                        <p className={`text-lg mb-1 ${currentView === 'likes' ? 'text-orange-600' : ''}`} onClick={setLikesView}>찜한 상품</p>
                        <p className={`text-lg mb-1 ${currentView === 'likes' ? 'text-orange-600' : ''}`} onClick={setLikesView}>{countLike}</p>
                    </div><div>
                        <p className={`text-lg mb-1 ${currentView === 'offers' ? 'text-orange-600' : ''}`} onClick={setOffersView}>가격 제안</p>
                        <p className={`text-lg mb-1 ${currentView === 'offers' ? 'text-orange-600' : ''}`} onClick={setOffersView}>{countOffer}</p>
                    </div><div>
                        <p className={`text-lg mb-1 ${currentView === 'buy' ? 'text-orange-600' : ''}`} onClick={setBuyView}>구매 내역</p>
                        <p className={`text-lg mb-1 ${currentView === 'buy' ? 'text-orange-600' : ''}`}  onClick={setBuyView}>{countBuy}</p>
                    </div>
                </div>
            </div>
    )
}

export default MyProfileInfoComponent;