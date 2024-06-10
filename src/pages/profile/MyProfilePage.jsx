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