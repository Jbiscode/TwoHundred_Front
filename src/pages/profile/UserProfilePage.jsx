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