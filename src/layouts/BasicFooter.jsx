import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFooterStore from '@zustand/footerStore';

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
    const { currentPage, openHomePage, openSearchPage, openMyLocationPage, openChatPage, openMyPage } = useFooterStore();

    useEffect(() => {
        if (currentPage) {
            navigate(currentPage);
            window.scrollTo({ top: 0 });
            console.log(currentPage);
        }
    }, [currentPage, navigate]);

    console.log(`Current Page: ${currentPage}`);


    

    return (
        // <div className="sticky bottom-0 z-10">
        //     <footer className="footer footer-center p-4 bg-white text-base-content">
        //         <aside>
        //             <p>Copyright © 2024 - All right reserved by BnB Industries Ltd</p>
        //         </aside>
        //     </footer>
        // </div>

        <div className="sticky -bottom-[0.6px] w-full z-10">
        <footer className="footer footer-center p-3 px-7 bg-white text-base-content shadow-lg border-solid border-t-[1px] border-gray-300">
            <aside className="flex justify-between w-full">
                <div onClick={openHomePage} className="flex flex-col items-center">
                <img src={currentPage == '/' ? clickHome : home} alt="home" className="w-6 h-6" />
                    <span></span>
                </div>
                <div onClick={openSearchPage} className="flex flex-col items-center">
                    <img src={currentPage == '/search' ? clickSearch : search} alt="search" className="w-6 h-6" />
                    <span></span>
                </div>
                <div onClick={openMyLocationPage} className="flex flex-col items-center">
                <img src={currentPage == '/myLocation' ? clickLocation : location} alt="search" className="w-7 h-7" />
                    <span></span>
                </div>
                <div onClick={openChatPage} className="flex flex-col items-center">
                    <img src={currentPage == '/chat/list' ? clickChat : chat} alt="search" className="w-7 h-7" />
                    <span></span>
                </div>
                <div onClick={openMyPage} className="flex flex-col items-center">
                <img src={currentPage == '/users/me' ? clickMypage : mypage} alt="search" className="w-9 h-9" />
                    <span></span>
                </div>
            </aside>
        </footer>
    </div>
    );
}

export default BasicFooter;