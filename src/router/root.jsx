import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@components/ProtectedRoute";

const Loading = <div>Loading....</div>;
const MainPage = lazy(() => import("@pages/MainPage"));
const LoginPage = lazy(() => import("@pages/LoginPage.jsx"));
const ProfilePage = lazy(() => import("@pages/profile/ProfilePage.jsx"))

const root = createBrowserRouter([
    {
        path: "/",
        element: (
        <Suspense fallback={Loading}>
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>
        </Suspense>
        ),
    },
    {
        path: "/login",
        element: (
        <Suspense fallback={Loading}>
            <LoginPage />
        </Suspense>
        ),
    },
    {
        path : "/profile",
        element : (
            <Suspense fallback={Loading}>
                <ProfilePage/>
            </Suspense>
        )
    }
]);

export default root;
