import React, { useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import CLOTHES from "@/assets/images/clothes.png"
import { Link } from "react-router-dom";
import ProfileInfoComponent from "@components/profile/ProfileInfoComponent";
import ReviewComponent from "@components/profile/ReviewComponent";


const UserProfilePage = () => {
 

    return (
       <div className="px-6">
            <ProfileInfoComponent/>
            <ReviewComponent/>
       </div>
    )
}

export default UserProfilePage;