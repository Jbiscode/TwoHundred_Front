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
