import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useModalStore = create(
    
        (set) => ({
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            openLoginModal: () => set(state => ({ isLoginModalOpen: true })),
            closeLoginModal: () => set(state => ({ isLoginModalOpen: false })),
            openSignupModal: () => set(state => ({ isSignupModalOpen: true })),
            closeSignupModal: () => set(state => ({ isSignupModalOpen: false })),
        })
    
)

export default useModalStore;