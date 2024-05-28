import React, { useState } from "react";
import { Link } from "react-router-dom";
import PHOTO from "@/assets/images/photo.svg"
import PROFILE_IMAGE from "@/assets/images/sorage.png"
const InfoModifyModal = () => {
   

    return (
        <div>
            <div className="text-center font-bold text-lg mb-6 mt-5">
                <div className="flex justify-center mb-3">
                    <p className="text-2xl mb-2">회원 정보 수정</p>
                </div>
                <div>
                    <div className="flex justify-center relative">
                        <img src={PROFILE_IMAGE} className="w-40 h-40 rounded-full contain"/>
                        <div className="w-8 h-8 bg-gray-500 rounded-full flex justify-center items-center absolute bottom-2 right-1/3">
                            <img src={PHOTO} className="w-5 h-5"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <form action="javascript:void(0)">
                    <div className="mb-8">
                    <div className="h-96 overflow-y-auto px-2">
                        <div className="mb-6">
                            <p className="font-bold text-lg mb-2 pl-1">닉네임</p>
                            <div >
                                <input type="text" placeholder="닉네임 ( 2 ~ 15자 )" className="input input-bordered w-full " />
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="font-bold text-lg mb-2 pl-1">주소</p>
                            <div >
                                <input type="text" placeholder="주소" className="input input-bordered w-full " />
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="font-bold text-lg mb-1 pl-1">비밀번호</p>
                            <p className="font-bold text-sm mb-2 pl-1 text-gray-400">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                            <div >
                                <input type="password" placeholder="비밀번호" className="input input-bordered w-full " />
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="font-bold text-lg mb-1 pl-1">비밀번호</p>
                            <p className="font-bold text-sm mb-2 pl-1 text-gray-400">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                            <div >
                                <input type="password" placeholder="비밀번호" className="input input-bordered w-full " />
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-primary w-full text-lg mb-3 font-bold">수정하기</button>
                    </div>
                    <div className="flex justify-end">
                    <button className="btn btn-neutral w-full text-lg mb-3 font-bold">회원탈퇴</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default InfoModifyModal;
