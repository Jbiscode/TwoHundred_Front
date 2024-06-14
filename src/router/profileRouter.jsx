import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <div>Loading....</div>
const UserProfilePage = lazy(() => import("@pages/profile/UserProfilePage"))
const MyProfilePage = lazy(() => import("@pages/profile/MyProfilePage"))
const ProtectedRoute = lazy(() => import("@router/ProtectedRoute"))

const profileRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace={true} to="me"/>
        },
        {
            path: ":userId",
            element: <Suspense fallback={Loading}><UserProfilePage/></Suspense>
        },
        {
            path: "me",
            element: 
            <ProtectedRoute fetchURL="/api/v2/manager">
                <Suspense fallback={Loading}>
                    <MyProfilePage/>
                </Suspense>
            </ProtectedRoute>
        },
        
    ]
}

export default profileRouter;