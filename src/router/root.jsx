import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@components/ProtectedRoute";

const Loading = <div>Loading....</div>;
const MainPage = lazy(() => import("@pages/MainPage"));
const LoginPage = lazy(() => import("@pages/LoginPage.jsx"));
const IndexPage = lazy(() => import("@pages/IndexPage.jsx"));


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
        path: "/index",
        element: (
        <Suspense fallback={Loading}>
            <IndexPage />
        </Suspense>
        ),
    }
]);

export default root;
