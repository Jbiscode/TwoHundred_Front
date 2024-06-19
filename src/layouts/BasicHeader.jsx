import { useEffect, useState } from "react";
import useAuthStore from "@zustand/authStore";
import useModalStore from "@zustand/modalStore";
import toast, { Toaster } from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "@/api/index"

function BasicHeader() {
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { openLoginModal } = useModalStore();
    const {isLoggedin}  = useAuthStore(state => state)
    const [userDTO, setUserDTO] = useState({
        id : '',
        name : '',
        addr1 : '',
        addr2 : '',
        countBuy : '',
        countLike : '',
        countOffer : '',
        countSale : '',
        offerLevel : '',
        profileImageUrl : ''
    });
    const { id } = userDTO;

    useEffect(() => {
        if (id) {
            const params = new URLSearchParams(location.search);
            if (!params.get('id')) {
                params.set('id', id);
                navigate(`${location.pathname}?${params.toString()}`, { replace: true });
            }
        }
    }, [id, location, navigate]);


    const handleLogout = () => {
        toast.promise(useAuthStore.getState().logout(),
            {
                loading: 'loading...',
                success: <b>로그아웃 되었습니다.</b>,
                error: <b>로그아웃에 실패하였습니다.</b>,
            })
    }

    const handleSearchChange = (e) => {
        setContent(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchClick();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchClick();
    };

    const searchClick = () => {
        navigate(`/search?content=${content}`);
    };

    useEffect(()=>{
        if(isLoggedin){
            const fetchData = async () => {
                // 로그인이 필요한 정보받아오기
                try{
                    const response = await auth.get(
                        '/api/v1/users/me',
                        {withCredentials: true}
                    )
                if(response.resultCode == '401'){
                    setIsModalOpen(true)
                }
                if(response.resultCode == '200'){
                    setUserDTO(response.data)
                }
                }catch(error){
                    // console.log(error)
                }
            }
            
            fetchData();
        }
    },[isLoggedin])
    
    return (<>
        <Toaster></Toaster>
        <div className="sticky top-0 z-20">
        <div className="bg-white w-full h-full">
            <div className="hidden sm:block">
                <div className="navbar bg-white mb-2">
                    <div className="flex-1 ml-4">
                        <Link to={'/'} className="btn btn-ghost text-xl">Bid&Buy</Link>
                        <form onSubmit={handleSubmit} >
                        <label className="w-full input input-bordered flex items-center gap-2 ml-4 bg-white">
                            <input
                                type="text"
                                className="grow"
                                placeholder="상품명을 입력해주세요."
                                value={content}
                                onChange={handleSearchChange}
                                //onKeyDown={handleKeyDown}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                                onClick={searchClick}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>    
                        </form>
                        
                    </div>
                    <div className="flex-none mr-10">
                        <ul className="menu menu-horizontal">
                            <li>
                                <Link to={'/post/add'}>판매하기</Link>
                            </li>
                            <li>
                                <details>
                                    <summary>마이페이지</summary>
                                    <ul className="p-2 rounded-t-none bg-white">
                                        <li>
                                            <Link to={'/users/me'}>프로필</Link>
                                        </li>
                                        <li>
                                            <a onClick={handleLogout}>로그아웃</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="sm:hidden">
                <div className="navbar bg-white">
                    <div className="flex ml-4">
                        <Link to={'/'}
                            className="btn btn-ghost text-xl"
                        >Bid&Buy</Link>
                    </div>
                    <div className="flex flex-grow gap-2">
                        <div className="form-control mr-4 flex-grow">
                            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-white w-full h-10" 
                                value={content}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}/>
                        </div>

                            <div className="dropdown dropdown-end mr-10">

                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border-gray-300 border-solid border-2">
                                        <img alt="Tailwind CSS Navbar component" src={`https://kr.object.ncloudstorage.com/kjwtest/article/${isLoggedin ? `${userDTO.profileImageUrl}` : "s_uuid_7adc2b20-82c8-4f14-96f0-f68aa2613ac0"}`} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                                    <li>
                                        <Link to={'/post/add'} className="justify-between">
                                            판매하기
                                        </Link>
                                    </li>
                                    <li><Link to={'/users/me'}>프로필</Link></li>
                                    {
                                       isLoggedin ? <li onClick={handleLogout}><a>로그아웃</a></li> : <li onClick={openLoginModal}><a>로그인</a></li>     
                                    }
                                </ul>
                            </div>
                    </div>
                </div>
            </div>

        </div>  
</div>
        
        </>

    );
}

export default BasicHeader;