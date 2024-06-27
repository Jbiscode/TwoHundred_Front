import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "@api/apis";
import toast, { Toaster } from "react-hot-toast";
import useModalStore from "@zustand/modalStore";


const LoginModal = () => {
    const { openSignupModal, closeLoginModal } = useModalStore();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupModal, setSignupModal] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password)
          .then((token) => {
            console.log(token + "로그인 토큰확인");
            if (token !== undefined) {
              toast.success('로그인 성공');
              closeLoginModal();
            } else {
              toast.error('이메일 또는 비밀번호를 확인해주세요');
            }
          })
          .catch((error) => {
            console.error('로그인 실패:', error);
            toast.error('로그인 실패');
          });
      };

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
                            <input type="text" placeholder="이메일" className="input input-bordered w-full" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="font-bold text-lg mb-1 pl-1">비밀번호</p>
                        <p className="font-bold text-sm mb-2 pl-1 text-gray-400">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                        <div >
                            <input type="password" placeholder="비밀번호" className="input input-bordered w-full" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary w-full text-lg mb-3 font-bold" onClick={handleLogin}>이메일로 로그인</button>
                        <button className="btn btn-accent w-full text-lg" disabled>카카오로 로그인</button>
                    </div>
                </form>
                <div className="mt-8">
                    <div className="text-sm flex justify-center text-gray-400 mb-1">
                        <span className="mr-2">아직 회원이 아니신가요?</span>
                        <a className="underline" onClick={() => {openSignupModal(); closeLoginModal(); }}>회원가입</a>
                    </div>
                    <div className="text-sm flex justify-center text-gray-400">
                        <span className="mr-2">비밀번호를 잊으셨나요?</span>
                        <a className="underline">비밀번호 찾기</a>
                    </div>
                </div>
            </div>
           
        </div>          
    )
}

export default LoginModal;
