import { useAuthStore } from '@zustand/authStore';
import useModalStore from "@zustand/modalStore";
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isLoggedin } = useAuthStore();
    const { openLoginModal, closeLoginModal } = useModalStore();

    useEffect(() => {
        if (!isLoggedin) {
            openLoginModal();
        } else {
            closeLoginModal();
        }
    }, [isLoggedin, openLoginModal, closeLoginModal]);

    return (
        <>
            {isLoggedin && children}
        </>
    );
};

export default ProtectedRoute;
