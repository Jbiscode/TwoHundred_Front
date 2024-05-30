import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";


const Loading = <div>Loading....</div>
const ProfilePage = lazy(() => import("@pages/profile/ProfilePage"))

const profileRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><ProfilePage/></Suspense>
        }
        
    ]
}

export default profileRouter;