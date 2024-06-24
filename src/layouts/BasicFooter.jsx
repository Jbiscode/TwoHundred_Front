import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFooterStore from '@zustand/footerStore';
import useAuthStore from '@zustand/authStore';
import useGetConversations from '@hooks/chat/useGetConversations';
import useGetLastMessageAndUnread from '@hooks/chat/useGetLastMessageAndUnread';

import home from '@assets/images/icon/home.png';
import search from '@assets/images/icon/search.png';
import location from '@assets/images/icon/location.png';
import chat from '@assets/images/icon/chat.png';
import mypage from '@assets/images/icon/my.png';
import clickHome from '@assets/images/icon/clickHome.png';
import clickSearch from '@assets/images/icon/clickSearch.png';
import clickLocation from '@assets/images/icon/clickLocation.png';
import clickChat from '@assets/images/icon/clickChats.png';
import clickMypage from '@assets/images/icon/clickMy.png';


function BasicFooter() {
    const navigate = useNavigate();
    const {conversations} = useGetConversations();
    const [page, setPage]=useState("");
    useGetLastMessageAndUnread(conversations);

    const { currentPage, openHomePage, openSearchPage,openMyLocationPage, openChatPage, openMyPage } = useFooterStore();
    const { alarmCount } = useAuthStore();


    useEffect(() => {
        if (currentPage) {
            navigate(`${currentPage}`);
            window.scrollTo({ top: 0 });
            useFooterStore.setState({currentPage:''});
        }
    }, [currentPage, alarmCount]);

    useEffect(() => {
        const path = window.location.pathname.split('/').slice(0, 2).join('/');
        setPage(path);
    }, []);

    


    return (
        <div className="sticky -bottom-[0.6px] w-full z-10">
        <footer className="footer footer-center p-3 px-7 bg-white text-base-content shadow-lg border-solid border-t-[1px] border-gray-300">
            <aside className="flex justify-between w-full">
                <div onClick={openHomePage} className="flex flex-col items-center">
                <img src={page == '/' ? clickHome : home} alt="home" className="w-6 h-6" />
                    <span></span>
                </div>
                <div onClick={openSearchPage} className="flex flex-col items-center">
                    <img src={page == '/search' ? clickSearch : search} alt="search" className="w-6 h-6" />
                    <span></span>
                </div>
                <div onClick={openMyLocationPage} className="flex flex-col items-center">
                <img src={page == '/myLocation' ? clickLocation : location} alt="search" className="w-7 h-7" />
                    <span></span>
                </div>
                <div onClick={openChatPage} className="flex flex-col items-center relative">
                    <img src={page == '/chat' ? clickChat : chat} alt="search" className="w-7 h-7" />
                    {alarmCount>0 ? <span className='absolute left-4 bottom-3 bg-red-500 text-white rounded-full px-2 py-1'>{alarmCount}</span>:null}
                </div>
                <div onClick={openMyPage} className="flex flex-col items-center">
                <img src={page == '/users' ? clickMypage : mypage} alt="search" className="w-9 h-9" />
                    <span></span>
                </div>
            </aside>
        </footer>
    </div>
    );
}

export default BasicFooter;