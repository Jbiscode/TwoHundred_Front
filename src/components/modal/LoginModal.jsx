import React from "react";
import { Link } from "react-router-dom";

const LoginModal = () => {
    return (
        <div>
            <div className="text-center font-bold text-lg mb-6">
                <p className="text-2xl mb-2">로그인</p>
                <p>구매자가 제안해요, Bid&Buy</p>
            </div>
            <div className="p-5">
                <form action="">
                    <div className="mb-6">
                        <p className="font-bold text-lg mb-2 pl-1">이메일</p>
                        <div >
                            <input type="text" placeholder="이메일" className="input input-bordered w-full " />
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="font-bold text-lg mb-1 pl-1">비밀번호</p>
                        <p className="font-bold text-sm mb-2 pl-1 text-gray-400">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                        <div >
                            <input type="password" placeholder="비밀번호" className="input input-bordered w-full " />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary w-full text-lg mb-3 font-bold">이메일로 로그인</button>
                        <button className="btn btn-accent w-full text-lg">카카오로 로그인</button>
                    </div>
                </form>
                <div className="mt-8">
                    <div className="text-sm flex justify-center text-gray-400 mb-1">
                        <span className="mr-2">아직 회원이 아니신가요?</span>
                        <Link className="underline">회원가입</Link>
                    </div>
                    <div className="text-sm flex justify-center text-gray-400">
                        <span className="mr-2">비밀번호를 잊으셨나요?</span>
                        <Link className="underline">비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div>          
    )
}

export default LoginModal;
