import React, { useEffect, useRef, useState } from "react";
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
import {instance,auth} from "@api/index"
import useAuthStore from "@zustand/authStore";
import usemyprofileStore from "@zustand/myprofileStore";

const ProfileUpdateModal = () => {
    const {closeProfileUpdateModal } = useModalStore();
    const {token} = useAuthStore(state => state)
    const {updateMyProfileInfo} = usemyprofileStore(state => state)

    const [myInfoResponseDTO, setMyInfoResponseDTO] = useState({
        username : '',
        password : '',
        email : '',
        addr1 : '',
        addr2 : ''
    })

    useEffect(()=>{
        const fetch = async() => {
            const response = await auth.get('/api/v1/users/me/info')
            if(response.resultCode == 200){
                setMyInfoResponseDTO(response.data)
            }
        }
        fetch();
    },[])

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

    const {username, password, email, addr1, addr2} = myInfoResponseDTO
   
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const [isValidEmail, setIsValidEmail] = useState(true)

    const onInputChange = (e) => {
        setMyInfoResponseDTO({
            ...myInfoResponseDTO,
            [e.target.name] : e.target.value
        })
        if(e.target.name=='email'){
            setEmailCheckReq({email : e.target.value})
            setIsValidEmail(emailRegex.test(e.target.value))
        }
    }

    const onUpdate = (e) => {
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
       
        // 모든 값이 false인 경우에만 회원가입 진행
        
        var formData = new FormData()

        formData.append("myInfoResponseDTO", new Blob(
            [JSON.stringify(myInfoResponseDTO)],
             {type : 'application/json'})
        )

        if(files.length > 0){
            for(var i = 0 ; i<files.length ; i++){
                formData.append("img", files[i])
            }
        }

        const update = async() => {
            try{
                const status = await axios.put('/api/v1/users/me/info',formData,{
                    headers : {
                        "Content-Type": 'multipart/form-data',
                        Authorization: `${token}`,
                    }
                });
                if(status.status == 200){
                    closeProfileUpdateModal();
                    toast.success("회원정보를 수정했습니다.")
                    updateMyProfileInfo()
                }
                console.log(status)
            }catch(error){
                if(error.response.status == 409) toast.error("필수 입력값을 입력해주세요.")
                if(error.response.status == 411) toast.error("비밀번호를 8자 이상 입력해주세요.")
            }
            
            
        }
         
        update();
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <div>
            
            <div className="text-center font-bold text-lg mb-6">
                <p className="text-2xl mb-2">회원정보 수정</p>
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
                                                    <img src={`https://kr.object.ncloudstorage.com/kjwtest/article/${myInfoResponseDTO.profileImageUrl}`}/>
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
                                <input type="text" name="username" value={myInfoResponseDTO.username} placeholder="닉네임 ( 2 ~ 15자 )" className={`input input-bordered w-full ${isEmptyInput.isUsernameEmpty ? 'border-rose-600' : ''}`} onChange={onInputChange} />
                            </div>
                            {
                                isEmptyInput.isUsernameEmpty && <div className="mt-2 ml-1 text-rose-600">닉네임을 입력하세요.</div>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="font-bold text-lg mb-2 pl-1">주소</p>
                            <div >
                                <div className="flex gap-3">
                                    <input type="text" placeholder="시" className={`input input-bordered w-full ${isEmptyInput.isAddr1Empty ? 'border-rose-600' : ''}`} value={myInfoResponseDTO.addr1} name="addr1" readOnly/>
                                    <PostModal className="w-full" setUserSignupDTO={setMyInfoResponseDTO}/>
                                </div>
                                <div className="mt-3">
                                    <input type="text" placeholder="군/구" className={`input input-bordered w-full ${isEmptyInput.isAddr2Empty ? 'border-rose-600' : ''}`} value={myInfoResponseDTO.addr2} name="addr2" readOnly/>
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
                                <input type="text" placeholder="이메일" className={`input input-bordered w-full ${isEmptyInput.isEmailEmpty ? 'border-rose-600' : ''}`} name="email" value={myInfoResponseDTO.email} onChange={onInputChange} disabled={true}/>
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
                                <input type="password" placeholder="비밀번호"  className={`input input-bordered w-full ${isEmptyInput.isPasswordEmpty || isEmptyInput.isDiffPassword ? 'border-rose-600' : ''}`} value={myInfoResponseDTO.password} name="password" onChange={onInputChange}/>
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
                        <button className="btn btn-primary w-full text-lg mb-3 font-bold" onClick={onUpdate}>수정하기</button>
                    </div>
                </form>
            </div>
        </div>          
    )
}

export default ProfileUpdateModal;
