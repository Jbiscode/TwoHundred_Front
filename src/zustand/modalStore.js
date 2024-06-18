import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useModalStore = create(
    
        (set) => ({
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            isWriteReviewModalOpen: false,
            isOfferModalOpen: false,
            isReviewModalOpen: false,
            selectedArticleId: null,
            openLoginModal: () => set(state => ({ isLoginModalOpen: true })),
            closeLoginModal: () => set(state => ({ isLoginModalOpen: false })),
            openSignupModal: () => set(state => ({ isSignupModalOpen: true })),
            closeSignupModal: () => set(state => ({ isSignupModalOpen: false })),
            openWriteReviewModal: () => set(state => ({ isWriteReviewModalOpen: true })),
            closeWriteReviewModal : () => set(state => ({ isWriteReviewModalOpen: false })),
            openOfferModal: () => set(state => ({ isOfferModalOpen: true })),
            closeOfferModal: () => set(state => ({ isOfferModalOpen: false })),
            setSelectedArticleId: (articleId) => set({selectedArticleId : articleId}),
            openReviewModal: () => set(state => ({ isReviewModalOpen: true})),
            closeReviewModal : () => set(state => ({ isReviewModalOpen: false })),
        })
    
)

export default useModalStore;