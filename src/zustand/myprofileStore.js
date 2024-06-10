import { create } from 'zustand';

const usemyprofileStore = create(
    
        (set) => ({
            currentView: 'sales',
            updateMyProfile : false,
            setSalesView: () => set({ currentView: 'sales' }),
            setLikesView: () => set({ currentView: 'likes' }),
            setOffersView: () => set({ currentView: 'offers' }),
            setBuyView: () => set({ currentView: 'buy' }),
            updateMyProfileInfo: () => set((state) => ({ updateMyProfile: !state.updateMyProfile })),
        })
    
)

export default usemyprofileStore;