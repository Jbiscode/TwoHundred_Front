import { useAuthStore } from '@zustand/authStore';
import useModalStore from "@zustand/modalStore";
import { useEffect, useState } from 'react';
import LoginModal from '@components/modal/LoginModal';
import Modal from '@components/templates/Modal';
import { Navigate, useLocation } from 'react-router-dom';
import { auth ,instance} from '@api/index';

const ProtectedRoute = ({ children, fetchURL }) => {
    const { isLoggedin } = useAuthStore();
    const { openLoginModal, closeLoginModal } = useModalStore();

    useEffect(() => {
        if (!isLoggedin) {
            openLoginModal();
        } else {
            closeLoginModal();
        }
    }, [isLoggedin]);

    return (
        <>
            {isLoggedin && children}
        </>
    );
};

export default ProtectedRoute;
