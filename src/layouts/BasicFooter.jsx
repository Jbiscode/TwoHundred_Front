import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFooterStore from '@zustand/footerStore';

import home from '@assets/images/icon/home.png';
import search from '@assets/images/icon/search.png';
import location from '@assets/images/icon/location.png';
import chat from '@assets/images/icon/chat.png';
import mypage from '@assets/images/icon/my.png';

function BasicFooter() {
    const navigate = useNavigate();
    const { currentPage, openHomePage, openSearchPage, openMyLocationPage, openChatPage, openMyPage } = useFooterStore();

    useEffect(() => {
        if (currentPage!='') {
            navigate(`/${currentPage}`);
            window.scrollTo({ top: 0 });
            useFooterStore.setState({ currentPage: '' });
        }
    }, [currentPage]);


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
                    <img src={home} alt="home" className="w-6 h-6" />
                    <span></span>
                </div>
                <div onClick={openSearchPage} className="flex flex-col items-center">
                    <img src={search} alt="search" className="w-6 h-6" />
                    <span></span>
                </div>
                <div onClick={openMyLocationPage} className="flex flex-col items-center">
                    <img src={location} alt="search" className="w-7 h-7" />
                    <span></span>
                </div>
                <div onClick={openChatPage} className="flex flex-col items-center">
                    <img src={chat} alt="chat" className="w-7 h-7" />
                    <span></span>
                </div>
                <div onClick={openMyPage} className="flex flex-col items-center">
                    <img src={mypage} alt="mypage" className="w-9 h-9" />
                    <span></span>
                </div>
            </aside>
        </footer>
    </div>
    );
}

export default BasicFooter;