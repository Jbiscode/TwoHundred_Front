import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFooterStore from '@zustand/footerStore';

import home from '@assets/images/icon/home.png';
import search from '@assets/images/icon/search.png';
import chat from '@assets/images/icon/chat.png';
import mypage from '@assets/images/icon/my.png';

function BasicFooter() {
    const navigate = useNavigate();
    const { currentPage, openHomePage, openSearchPage, openChatPage, openMyPage } = useFooterStore();

    useEffect(() => {
        if (currentPage!='') {
            navigate(`/${currentPage}`);
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

        <div className="sticky bottom-0 w-full z-10">
        <footer className="footer footer-center p-2 px-7 bg-white text-base-content shadow-lg border-solid border-t-[1px] border-gray-300">
            <aside className="flex justify-between w-full">
                <div onClick={openHomePage} className="flex flex-col items-center">
                    <img src={home} alt="home" className="w-6 h-6" />
                    <span>홈</span>
                </div>
                <div onClick={openSearchPage} className="flex flex-col items-center w-13">
                    <img src={search} alt="search" className="w-6 h-6" />
                    <span>검색</span>
                </div>
                <div onClick={openSearchPage} className="flex flex-col items-center w-13">
                    <img src={search} alt="search" className="w-6 h-6" />
                    <span>내 근처</span>
                </div>
                <div onClick={openChatPage} className="flex flex-col items-center w-13">
                    <img src={chat} alt="chat" className="w-7 h-7" />
                    <span>채팅</span>
                </div>
                <div onClick={openMyPage} className="flex flex-col items-center w-13">
                    <img src={mypage} alt="mypage" className="w-8 h-8" />
                    <span>마이페이지</span>
                </div>
            </aside>
        </footer>
    </div>
    );
}

export default BasicFooter;