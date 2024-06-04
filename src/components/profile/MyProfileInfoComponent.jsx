import React, { useEffect, useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import useAuthStore from "@zustand/authStore"
import {auth} from "@api/index"

const MyProfileInfoComponent = () => {

    const {userDTO, setUserDTO} = useState();
    const {isLoggedin} = useAuthStore(state => state)

    useEffect(()=>{
        const fetchData = async () => {
            // 로그인이 필요한 정보받아오기
            try{
                const response = await auth.get(
                    '/api/v1/users/my',
                    {withCredentials: true}
                )
            if(response.resultCode == '401'){
                setIsModalOpen(true)
            }
            if(response.resultCode == '200'){
                setUserDTO(response.data)
            }
            console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        
        fetchData();
    },[])

    return (
            <div className="border w-full border-gray-300 px-6 py-10 border-solid mt-8 mb-8">
                <div className="flex">
                    <div className="w-1/3 flex justify-center items-center">
                        <img src={PROFILE_IMAGE} className="w-20 h-20 rounded-full"/>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">히텧</p>
                        <p className="text-orange-500 text-base font-semibold">Level 1</p>
                        <p className="text-gray-400 text-base font-semibold">동작구 사당동</p>
                    </div>
                </div>
                <div className="divider divider-default"></div>
                <div className="flex justify-around text-center font-bold ">
                    <div>
                        <p className="text-lg mb-1">판매 상품</p>
                        <p className="text-lg">30</p>
                    </div>
                    <div>
                        <p className="text-lg mb-1">찜한 상품</p>
                        <p className="text-lg">30</p>
                    </div><div>
                        <p className="text-lg mb-1">가격 제안</p>
                        <p className="text-lg">30</p>
                    </div><div>
                        <p className="text-lg mb-1">구매 내역</p>
                        <p className="text-lg">30</p>
                    </div>
                </div>
            </div>
    )
}

export default MyProfileInfoComponent;