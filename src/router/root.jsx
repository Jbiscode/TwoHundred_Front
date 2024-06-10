import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
// import ProtectedRoute from "@components/ProtectedRoute";
import postRouter from "@router/postRouter.jsx";
import chatRouter from "@router/chatRouter.jsx";
import profileRouter from "./profileRouter";


const Loading = <div>Loading....</div>;
const ProfilePage = lazy(() => import("@pages/profile/IndexPage.jsx"))

const IndexPage = lazy(() => import("@pages/IndexPage.jsx"));
const SearchPage = lazy(() => import("@pages/SearchPage.jsx"));
const PostPage = lazy(() => import("@pages/post/IndexPage"));
const ChatPage = lazy(() => import("@pages/chat/IndexPage"));


const root = createBrowserRouter([
    {
        path: "/",
        element: (
        <Suspense fallback={Loading}>
                <IndexPage />
        </Suspense>
        ),
    },
    {
        path: "/search",
        element: (
            <Suspense fallback={Loading}>
                <SearchPage/>
            </Suspense>
        ),
    },
    {
        path : "/users",
        element : (
            <Suspense fallback={Loading}>
                <ProfilePage/>
            </Suspense>
        ),
        children : profileRouter()
    },
    {
        path: "/post",
        element: (
            <Suspense fallback={Loading}>
                <PostPage />
            </Suspense>
        ),
        children: postRouter(),
    },
    {
        path: "/chat",
        element: (
            <Suspense fallback={Loading}>
                <ChatPage />
            </Suspense>
        ),
        children: chatRouter(),
    }
]);

export default root;
