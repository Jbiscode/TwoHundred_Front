import React from "react";
import { Link } from "react-router-dom";

const SignupModal = () => {
    return (
        <div>
            <div className="text-center font-bold text-lg mb-6">
                <p className="text-2xl mb-2">회원가입</p>
            </div>
            <div className="p-5">
                <form action="">
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
                            <p className="font-bold text-lg mb-2 pl-1">이메일</p>
                            <div className="flex gap-3">
                                <input type="text" placeholder="이메일" className="input input-bordered w-full " />
                                <button className="btn btn-outline">이메일 인증</button>
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
                    <div>
                        <button className="btn btn-primary w-full text-lg mb-3 font-bold">회원가입</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default SignupModal;
