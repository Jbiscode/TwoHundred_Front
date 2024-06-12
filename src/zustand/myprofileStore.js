import { create } from 'zustand';

const usemyprofileStore = create(
    
        (set) => ({
            currentView: 'sales',
            updateMyProfile : false,
            selectReviewId : null,
            setSalesView: () => set({ currentView: 'sales' }),
            setLikesView: () => set({ currentView: 'likes' }),
            setOffersView: () => set({ currentView: 'offers' }),
            setBuyView: () => set({ currentView: 'buy' }),
            setSelectReviewId : (reviewId) => set({ selectReviewId : reviewId}),
            updateMyProfileInfo: () => set((state) => ({ updateMyProfile: !state.updateMyProfile })),
        })
    
)

export default usemyprofileStore;