import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import PostModal from "./PostModal";
import { userSignUp } from "@api/apis";
import {moveuserpage} from "@api/apis"

const SignupModal = () => {
    
    const [userSignupDTO, setUserSignupDTO] = useState({
        username : '',
        password : '',
        email : '',
        addr1 : '',
        addr2 : ''
    })

    const [isEmptyInput, setIsEmptyInput] = useState({
        isUsernameEmpty : false,
        isPasswordEmpty : false,
        isEmailEmpty : false,
        isAddr1Empty : false,
        isAddr2Empty : false,
        isDiffPassword : false
    })

    const [repassword, setRepassword] = useState('')

    const {username, password, email, addr1, addr2} = userSignupDTO
   
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const [isValidEmail, setIsValidEmail] = useState(true)

    const onInputChange = (e) => {
        setUserSignupDTO({
            ...userSignupDTO,
            [e.target.name] : e.target.value
        })
    }

    const onSignup = (e) => {
        e.preventDefault();
        setIsValidEmail(emailRegex.test(email))
        let newIsEmptyInput = {
            isUsernameEmpty: username === '',
            isPasswordEmpty: password === '',
            isEmailEmpty: email === '' ,
            isAddr1Empty: addr1 === '',
            isAddr2Empty: addr2 === '',
            isDiffPassword: password !== repassword
        };
    
        setIsEmptyInput(newIsEmptyInput);
    
        // newIsEmptyInput 객체의 값 중 하나라도 true이면 return
        if (Object.values(newIsEmptyInput).some(value => value)) {
            return;
        }
        
        console.log(userSignupDTO)
        // 모든 값이 false인 경우에만 회원가입 진행
        userSignUp(userSignupDTO);
    }

    return (
        <div>
            <div className="text-center font-bold text-lg mb-6">
                <p className="text-2xl mb-2">회원가입</p>
            </div>
            <div className="p-5">
                <form action="">
                    <div className="h-96 overflow-y-auto px-2">
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-2 pl-1">닉네임</p>
                            <div >
                                <input type="text" name="username" value={userSignupDTO.username} placeholder="닉네임 ( 2 ~ 15자 )" className={`input input-bordered w-full ${isEmptyInput.isUsernameEmpty ? 'border-rose-600' : ''}`} onChange={onInputChange} />
                            </div>
                            {
                                isEmptyInput.isUsernameEmpty && <div className="mt-2 ml-1 text-rose-600">닉네임을 입력하세요.</div>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-2 pl-1">주소</p>
                            <div >
                                <div className="flex gap-3">
                                    <input type="text" placeholder="시" className={`input input-bordered w-full ${isEmptyInput.isAddr1Empty ? 'border-rose-600' : ''}`} value={userSignupDTO.addr1} name="addr1" readOnly/>
                                    <PostModal className="w-full" setUserSignupDTO={setUserSignupDTO}/>
                                </div>
                                <div className="mt-3">
                                    <input type="text" placeholder="군/구" className={`input input-bordered w-full ${isEmptyInput.isAddr2Empty ? 'border-rose-600' : ''}`} value={userSignupDTO.addr2} name="addr2" readOnly/>
                                </div>
                            </div>
                            {
                                isEmptyInput.isAddr1Empty && <div className="mt-2 ml-1 text-rose-600">주소를 입력하세요.</div>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-2 pl-1">이메일</p>
                            <div className="flex gap-3">
                                <input type="text" placeholder="이메일" className={`input input-bordered w-full ${isEmptyInput.isEmailEmpty ? 'border-rose-600' : ''}`} name="email" value={userSignupDTO.email} onChange={onInputChange}/>
                                <button className="btn btn-outline" >이메일 인증</button>
                            </div>
                            {
                                isEmptyInput.isEmailEmpty && <div className="mt-2 ml-1 text-rose-600">이메일을 입력하세요.</div>
                            }
                            {
                               !isValidEmail && <div className="mt-2 ml-1 text-rose-600">이메일 형식을 입력하세요.</div>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-1 pl-1">비밀번호</p>
                            <p className="font-bold text-sm mb-2 pl-1 text-gray-400">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                            <div >
                                <input type="password" placeholder="비밀번호"  className={`input input-bordered w-full ${isEmptyInput.isPasswordEmpty || isEmptyInput.isDiffPassword ? 'border-rose-600' : ''}`} value={userSignupDTO.password} name="password" onChange={onInputChange}/>
                            </div>
                            {
                                isEmptyInput.isPasswordEmpty && <div className="mt-2 ml-1 text-rose-600">비밀번호를 입력하세요.</div>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-1 pl-1">비밀번호</p>
                            <p className="font-bold text-sm mb-2 pl-1 text-gray-400">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                            <div >
                                <input type="password" placeholder="비밀번호" className={`input input-bordered w-full ${isEmptyInput.isDiffPassword || isEmptyInput.isPasswordEmpty ? 'border-rose-600' : ''}`}value={repassword}  name="repassword" onChange={(e)=>setRepassword(e.target.value)}/>
                            </div>
                            {
                                isEmptyInput.isDiffPassword && <div className="mt-2 ml-1 text-rose-600">비밀번호가 다릅니다.</div>
                            }
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary w-full text-lg mb-3 font-bold" onClick={onSignup}>회원가입</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default SignupModal;
