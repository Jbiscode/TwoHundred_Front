import { create } from 'zustand';

const footerStore = create(

    (set) => ({
        currentPage: '',
        openSearchPage: () => set({ currentPage: 'search' }),
        openHomePage: () => set({ currentPage: '/ ' }),
        openChatPage: () => set({ currentPage: 'chat/list' }),
        openMyPage: () => set({ currentPage: 'users/me' })
    })
)

export default footerStore