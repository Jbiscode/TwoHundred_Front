import { useAuthStore } from '@zustand/authStore';
import { useEffect, useState } from 'react';
import LoginModal from '@components/modal/LoginModal';
import Modal from '@components/templates/Modal';
import { Navigate, useLocation } from 'react-router-dom';
import { auth ,instance} from '@api/index';

const ProtectedRoute = ({ children, fetchURL }) => {
    const { isLoggedin } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // const fetchData = async () => {
        //     // 로그인이 필요한 정보받아오기
        //     try{
        //         const response = await auth.get(
        //             fetchURL,
        //             {withCredentials: true}
        //         )
        //     if(response.resultCode == '401'){
        //         setIsModalOpen(true)
        //     }
        //     }catch(error){
        //         console.log(error)
        //     }
        // }
        
        // fetchData();
        if (!isLoggedin) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [isLoggedin]);



    const onModalHandler = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <>
            {isLoggedin && children}
            {!isLoggedin && (
                <Modal isModalOpen={isModalOpen} onModalClose={onModalHandler}>
                    <LoginModal onModalClose={onModalHandler} />
                </Modal>
            )}
        </>
    );
};

export default ProtectedRoute;
