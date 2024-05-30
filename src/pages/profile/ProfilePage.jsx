import React, { useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import CLOTHES from "@/assets/images/clothes.png"
import { Link } from "react-router-dom";
import LoginModal from "@/components/modal/LoginModal";
import Modal from "@/components/templates/Modal";
import SignupModal from "@/components/modal/SignupModal";
import OfferModal from "@/components/modal/OfferModal";
import ConfirmBuyerModal from "@/components/modal/ConfirmBuyerModal";
import WriteReviewModal from "@/components/modal/WriteReviewModal";
import MyReviewModal from "@/components/modal/MyReviewModal";
import ChatModal from "@/components/modal/ChatModal";
import InfoModifyModal from "@/components/modal/InfoModifyModal";
import BasicLayout from "@layouts/BasicLayout.jsx";
import ProfileComponent from "@/components/profile/ProfileComponent";

const ProfilePage = () => {
 

    return (
       <div>
            <ProfileComponent/>
       </div>
    )
}

export default ProfilePage;