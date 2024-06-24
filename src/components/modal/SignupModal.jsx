import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import PostModal from "./PostModal";
import { userSignUp } from "@api/apis";
import {moveuserpage} from "@api/apis"
import useModalStore from '@zustand/modalStore'
import IMAGEUPLOAD from '@assets/images/icon/defaultprofileImg.png'
import CAMERA from '@assets/images/icon/camera-solid.svg'
import axios from "axios";
import toast from "react-hot-toast";
import {instance} from "@api/index"

const SignupModal = () => {
    const {closeSignupModal } = useModalStore();

    const [imgList, setImgList] = useState([])
    const [files,setFiles] = useState([])
    const imgRef = useRef();
    const [emailAuthCode, setEmailAuthCode] = useState('')
    const [emailCheckReq, setEmailCheckReq] = useState({
        email : ''
    })
    const [inputEmailAuthCode, setInputEmailAuthCode] = useState('')
    const [isverifiedCode, setIsverifiedCode] = useState(false)
    const [authCodeInputTag, setAuthCodeInputTag] = useState(false)
    const authCodeRef = useRef();
    const [isReadOnly, setIsReadOnly] = useState(false)

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
        if(e.target.name=='email'){
            setEmailCheckReq({email : e.target.value})
            setIsValidEmail(emailRegex.test(e.target.value))
        }
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
        if(!isverifiedCode){
            toast.error("인증코드를 다시 확인해주세요.")
            return;
        } 
        
        // 모든 값이 false인 경우에만 회원가입 진행
        
        var formData = new FormData()

        formData.append("userSignupDTO", new Blob(
            [JSON.stringify(userSignupDTO)],
             {type : 'application/json'})
        )

        if(files.length > 0){
            for(var i = 0 ; i<files.length ; i++){
                formData.append("img", files[i])
            }
        }

        const singUp = async() => {
            const status = await userSignUp(formData);
            if(status == 201){
                closeSignupModal();
                toast.success("회원가입 되었습니다.")
            }
        }
         
        singUp();
    }   

    const onImgInput = (e) => {
    
        const files = Array.from(e.target.files)
        var imgArray = []

        files.map((item,index) => {
            const objectURL = URL.createObjectURL(item);
            imgArray.push(objectURL);
        })

        setFiles(files)
        setImgList(imgArray)
    }

    const handleImgInputTrigger = () => {
        imgRef.current.click()
    }

    const handleEmailCheck = (e) => {
        if(emailCheckReq.email == ''){
            setIsValidEmail(false)
            toast.error("이메일 형식을 입력해주세요");
        } 
        else{
            if(!isValidEmail){ 
                toast.error("이메일 형식을 입력해주세요")
                return;
            }
            setAuthCodeInputTag(true)
            const fetch = async() => {
                try{
                    const response = await instance.post(`/api/v1/auth/emailCheck`,
                        { body : JSON.stringify(emailCheckReq)}
                    )
                    if(response.resultCode == 200){
                        toast.success('이메일 인증코드를 전송하였습니다.')
                        setEmailAuthCode(response.data)
                        
                    }
                    if(response.resultCode === 409){
                        toast.error('이미 존재하는 이메일입니다.')
                    }
                }catch(error){
                    console.log(error)
                }
                
            }
            fetch();
        }
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleAuthCodeCheck = () => {
        if(inputEmailAuthCode !== '' && inputEmailAuthCode == emailAuthCode){
            setIsverifiedCode(true)
            toast.success("인증에 성공했습니다.")
            setIsReadOnly(true)
        }else{
            setIsverifiedCode(false)
            toast.error("인증코드를 다시 확인해주세요.")
        }
    
    }

    return (
        <div>
            
            <div className="text-center font-bold text-lg mb-6">
                <p className="text-2xl mb-2">회원가입</p>
            </div>
            <div className="p-5">
                <form action="" onSubmit={handleSubmit}>
                    <div className="h-96 overflow-y-auto px-2">
                        <div className="flex justify-center items-center relative" onClick={handleImgInputTrigger}>
                            {
                                imgList.length === 0 ?
                                        <>
                                            <div className="avatar relative" >
                                                <div className="w-40 rounded-full">
                                                    <img src={IMAGEUPLOAD}/>
                                                </div>
                                               
                                            </div>
                                            <img className="absolute w-8 h-8 block bottom-0 right-1/3" src={CAMERA}/>
                                        </>
                                    :
                                     imgList.map(item => (
                                        <>
                                            <div className="avatar relative" onClick={handleImgInputTrigger} key={item}>
                                                <div className="w-40 rounded-full">
                                                    <img src={item} />
                                                </div>
                                            </div>
                                            <img className="absolute w-8 h-8 block bottom-0 right-1/3" src={CAMERA}/>
                                        </>
                                    ))
                            }
                        </div>
                        <input className="invisible" type="file"  name="img[]" onChange={onImgInput} ref={imgRef}/>
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
                            <p className="font-bold text-sm mb-2 pl-1 text-gray-400">* 로그인 시 사용할 이메일입니다.</p>
                            <div className="flex gap-3">
                                <input type="text" placeholder="이메일" className={`input input-bordered w-full ${isEmptyInput.isEmailEmpty ? 'border-rose-600' : ''}`} name="email" value={userSignupDTO.email} onChange={onInputChange}/>
                                <button className="btn btn-outline"  onClick={handleEmailCheck}>인증코드 발송</button>
                            </div>
                            {
                                authCodeInputTag && 
                                    <div className="flex gap-3 mt-1">
                                        <input type="text" placeholder="인증코드 입력" className={`input input-bordered w-full`} name="email" value={inputEmailAuthCode} onChange={(e) => {setInputEmailAuthCode(e.target.value)}} disabled={isReadOnly}/>
                                        <button className={`btn  ${isReadOnly ? 'btn-success' : 'btn-outline'}`}  onClick={handleAuthCodeCheck}>인증코드 확인</button>
                                    </div>
                            }
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
