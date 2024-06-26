import { useEffect } from "react";
import MyProfileInfoComponent from "@components/profile/MyProfileInfoComponent";
import SaleComponent from "@components/profile/SaleComponent";
import LikeComponent from "@components/profile/LikeComponent";
import usemyprofileStore from "@zustand/myprofileStore"
import OfferComponent from "@components/profile/OfferComponent";
import BuyComponent from "@components/profile/BuyComponent";


const MyProfilePage = () => {
    const {currentView,setSalesView, updateMyProfileInfo } = usemyprofileStore(state => state)
    useEffect(()=> {
        return () =>{
            setSalesView();
        }
    },[])

    return (
       <div className="px-6">
            <MyProfileInfoComponent/>
            {currentView === 'sales' &&   <SaleComponent/>}
            {currentView === 'likes' && <LikeComponent updateMyProfileInfo ={updateMyProfileInfo }/>}
            {currentView === 'offers' && <OfferComponent updateMyProfileInfo ={updateMyProfileInfo }/>}
            {currentView === 'buy' && <BuyComponent updateMyProfileInfo ={updateMyProfileInfo }/>}
          
       </div>
    )
}

export default MyProfilePage;