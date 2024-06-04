import React, { useState } from "react";
import PROFILE_IMAGE from "@/assets/images/sorage.png"
import CLOTHES from "@/assets/images/clothes.png"
import { Link } from "react-router-dom";
import MyProfileInfoComponent from "@components/profile/MyProfileInfoComponent";
import SaleComponent from "@components/profile/SaleComponent";


const MyProfilePage = () => {
 

    return (
       <div className="px-6">
            <MyProfileInfoComponent/>
            <SaleComponent/>
       </div>
    )
}

export default MyProfilePage;