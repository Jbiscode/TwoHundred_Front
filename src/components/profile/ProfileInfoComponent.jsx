import React, { useEffect, useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import usemyprofileStore from "@zustand/myprofileStore"
import {instance} from "@api/index"

const ProfileInfoComponent = ({userId}) => {
    const {setReviewsView, setSalesView, updateMyProfileInfo} = usemyprofileStore(state => state)


    const [userDTO, setUserDTO] = useState({
        id : '',
        username : '',
        addr1 : '',
        addr2 : '',
        countBuy : '',
        countLike : '',
        countOffer : '',
        countSale : '',
        countReview : '',
        offerLevel : '',
        profileImageUrl : ''
    });

    const { id,username, addr1, addr2, countBuy, countLike, countOffer, countReview,countSale, offerLevel, profileImageUrl} = userDTO

    useEffect(()=>{
        const fetchData = async () => {
            
            try{
                const response = await instance.get(
                    `/api/v1/users/${userId}`,
                    {withCredentials: true}
                )
            
            if(response.resultCode == '200'){
                setUserDTO(response.data)
                console.log(response.data)
                updateMyProfileInfo();
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();

    },[userId])

    return (
        <div className="border w-full border-gray-300 px-6 py-10 border-solid mt-8 mb-8 rounded-[10%]">
            <div className="flex gap-4">
                <div className="avatar">
                    <div className="w-32 rounded-full border-gray-300 border-solid border-4">
                        <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${profileImageUrl}`} />
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="mb-2 font-bold">{username}</p>
                    <p className="text-orange-500 text-base font-semibold">Level {offerLevel}</p>
                    <p className="text-gray-400 text-base font-semibold">{`${addr1} ${addr2}`}</p>
                </div>
            </div>
            <div className="divider divider-default"></div>
            <div className="flex justify-evenly text-center font-bold ">
                <div>
                    <p className="text-lg mb-1" onClick={setSalesView}>판매 상품</p>
                    <p onClick={setSalesView}>{countSale}</p>
                </div>
                <div className="divider divider-horizontal"></div>
                <div>
                    <p className="text-lg mb-1" onClick={setReviewsView}>거래 후기</p>
                    <p onClick={setReviewsView}>{countReview}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfoComponent;