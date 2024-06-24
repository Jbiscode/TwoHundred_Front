import { create } from 'zustand';

const footerStore = create(

    (set) => ({
        currentPage: '/',
        setCurrentPage: (page) => set({ currentPage: page }),
        openSearchPage: () => set({ currentPage: '/search' }),
        openMyLocationPage: () => set({ currentPage: '/myLocation' }),
        openHomePage: () => set({ currentPage: '/' }),
        openChatPage: () => set({ currentPage: '/chat/list' }),
        openMyPage: () => set({ currentPage: '/users/me' })
    })
)

export default footerStore