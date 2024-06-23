import {lazy, Suspense} from "react";
import MyLocationComponent from "../components/myLocation/MyLocationComponent";
import HeaderComponent from "../components/myLocation/HeaderComponent";
import FilterComponent from "../components/myLocation/FilterComponent";


const Loading = <div>Loading....</div>
const ProtectedRoute = lazy(() => import("@router/ProtectedRoute"))

const myLocationRouter = () => {
    return [
    
        {
            path: "",
            element: 
            <ProtectedRoute fetchURL="/api/v2/manager">
                <Suspense fallback={Loading}>
                    <FilterComponent />
                    <HeaderComponent />
                    <MyLocationComponent />
                </Suspense>
            </ProtectedRoute>
        },
    ]
};

export default myLocationRouter;