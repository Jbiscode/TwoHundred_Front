import ProfileInfoComponent from "@components/profile/ProfileInfoComponent";
import ReviewComponent from "@components/profile/ReviewComponent";
import SaleComponent from "@components/profile/SaleComponent";
import usemyprofileStore from "@zustand/myprofileStore"
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const UserProfilePage = () => {
    const {userId} = useParams();
    const {currentView,setSalesView, updateMyProfileInfo } = usemyprofileStore(state => state)
    useEffect(()=> {
        return () =>{
            setSalesView();
        }
    },[userId])
    return (
       <div className="px-6">
            <ProfileInfoComponent userId={userId}/>
            {currentView === 'sales' &&   <SaleComponent userId={userId}/>}
            {currentView === 'reviews' &&  <ReviewComponent userId={userId}/>}
       </div>
    )
}

export default UserProfilePage;