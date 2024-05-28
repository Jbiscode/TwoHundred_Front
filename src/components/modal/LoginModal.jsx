import React from "react";
import { Link } from "react-router-dom";

const LoginModal = () => {

    return (
        <div className="p-3 rounded-2xl bg-white"> 
            <div className="flex justify-end">
                <button className="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="text-center font-bold text-lg">
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
                            <input type="text" placeholder="이메일" className="input input-bordered w-full " />
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