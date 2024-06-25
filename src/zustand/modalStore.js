import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useModalStore = create(
    
        (set) => ({
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            isWriteReviewModalOpen: false,
            isOfferModalOpen: false,
            isReviewModalOpen: false,
            isUpdateReviewModalOpen : false,
            selectedArticleId: null,
            isCheckModalOpen: false,
            isProfileUpdateModalOpen : false,
            offerReload: false,
            openLoginModal: () => set((state) => ({ isLoginModalOpen: true })),
            closeLoginModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isLoginModalOpen: false }; }),
            openSignupModal: () => set((state) => ({ isSignupModalOpen: true })),
            closeSignupModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isSignupModalOpen: false }; }),
            openWriteReviewModal: () => set((state) => ({ isWriteReviewModalOpen: true })),
            closeWriteReviewModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isWriteReviewModalOpen: false }; }),
            openOfferModal: () => set((state) => ({ isOfferModalOpen: true })),
            closeOfferModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isOfferModalOpen: false }; }),
            setSelectedArticleId: (articleId) => set({ selectedArticleId: articleId }),
            openReviewModal: () => set((state) => ({ isReviewModalOpen: true })),
            closeReviewModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isReviewModalOpen: false }; }),
            openUpdateReviewModal: () => set((state) => ({ isUpdateReviewModalOpen: true })),
            closeUpdateReviewModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isUpdateReviewModalOpen: false }; }),
            openCheckModal: (onConfirm, onCancel) => set((state) => ({ isCheckModalOpen: true, onConfirm, onCancel })),
            closeCheckModal: () => set((state) => { document.body.style.overflow = "auto"; return { isCheckModalOpen: false }; }),
            setOfferReload: () => set((state) => ({ offerReload: !state.offerReload })),
            openProfileUpdateModal: () => set((state) => ({ isProfileUpdateModalOpen: true })),
            closeProfileUpdateModal: () => set((state) => { document.body.style.overflow = 'auto'; return { isProfileUpdateModalOpen: false }; }),
        })
    
)

export default useModalStore;