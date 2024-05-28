import React, { useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import { Link } from "react-router-dom";
import LoginModal from "@/components/modal/LoginModal";
import Modal from "@/components/templates/Modal";
import SignupModal from "@/components/modal/SignupModal";
import OfferModal from "@/components/modal/OfferModal";
import ConfirmBuyerModal from "@/components/modal/ConfirmBuyerModal";
import WriteReviewModal from "@/components/modal/WriteReviewModal";
import MyReviewModal from "@/components/modal/MyReviewModal";
import ChatModal from "@/components/modal/ChatModal";
import InfoModifyModal from "@/components/modal/InfoModifyModal";

const ProfilePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    
    const onModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            {/* 프로필 정보 */}
            <div className="border-2 w-full border-black min-h-80 p-8">
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
                <div className="flex justify-around text-center font-bold pt-4">
                    <div>
                        <p className="text-lg mb-1">판매 상품</p>
                        <p>30</p>
                    </div>
                    <div>
                        <p className="text-lg mb-1">판매 상품</p>
                        <p>30</p>
                    </div><div>
                        <p className="text-lg mb-1">판매 상품</p>
                        <p>30</p>
                    </div><div>
                        <p className="text-lg mb-1">판매 상품</p>
                        <p>30</p>
                    </div>
                </div>
            </div>
            
            {/* 거래 후기 */}
            <div>
                <p className="font-bold pt-4 mb-3">거래 후기</p>
                <div>
                    <div className="w-full flex border-solid border-t-2 border-black text-lg">
                        <div className="w-1/2 "><Link className="block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-black">판매 후기</Link></div>
                        <div className="w-1/2 "><Link className="block w-full text-center py-3 text-base font-bold border-solid border-b-2 border-gray-300">구매 후기</Link></div>
                    </div>
                </div>
                <div>
                    <div className="px-3 border-solid border-b-2 border-gray-300">
                        <div className="py-6">
                            <div className="flex items-center mb-5">
                                <div className="grow flex items-baseline gap-1">
                                    <span className="font-bold text-lx">황금효정</span>
                                    <span className="text-orange-500 text-base font-semibold">Lv. 1</span>
                                </div>
                                <div className="flex items-end">
                                    <p className="text-gray-400 text-base">7달 전</p>
                                </div>
                            </div>
                            <div className="font-bold text-lg">
                                <p className="mb-2">쿨거래 조아요 조아요~</p>
                                <div className="flex justify-between"> 
                                    <div className="p-1 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link>구매상품 | 잠이 오는 보약 새 상품</Link></div>
                                    <button className="btn btn-secondary">후기 남기기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 border-solid border-b-2 border-gray-300">
                        <div className="py-6">
                            <div className="flex items-center mb-5">
                                <div className="grow flex items-baseline gap-1">
                                    <span className="font-bold text-lx">황금효정</span>
                                    <span className="text-orange-500 text-base font-semibold">Lv. 1</span>
                                </div>
                                <div className="flex items-end">
                                    <p className="text-gray-400 text-base">7달 전</p>
                                </div>
                            </div>
                            <div className="font-bold text-lg">
                                <p className="mb-2">쿨거래 조아요 조아요~</p>
                                <div className="flex justify-between"> 
                                    <div className="p-1 text-base text-gray-400 border-solid border-gray-300 border flex items-center"><Link>구매상품 | 잠이 오는 보약 새 상품</Link></div>
                                    <button className="btn btn-secondary">후기 남기기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 페이징 */}
            <div className="flex justify-center mt-6">
                1 2 3
            </div>



            <Modal isModalOpen={isModalOpen} onModalClose={onModalClose}>
                <MyReviewModal/>
            </Modal>

        </div>
    )
}

export default ProfilePage;