import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
// import ProtectedRoute from "@components/ProtectedRoute";
import postRouter from "@router/postRouter.jsx";
import chatRouter from "@router/chatRouter.jsx";
import profileRouter from "./profileRouter";
import ParentModal from "@components/templates/ParentModal";
import myLocationRouter from "./myLocationRouter";



const Loading = <div>Loading....</div>;
const ProfilePage = lazy(() => import("@pages/profile/IndexPage.jsx"))

const IndexPage = lazy(() => import("@pages/IndexPage.jsx"));
const SearchPage = lazy(() => import("@pages/search/IndexPage"));
const PostPage = lazy(() => import("@pages/post/IndexPage"));
const ChatPage = lazy(() => import("@pages/chat/IndexPage"));
const MyLocationPage = lazy(() => import("@pages/myLocation/IndexPage"));


const root = createBrowserRouter([
    {
        path: "/",
        element: (
        <Suspense fallback={Loading}>
                <ParentModal/>
                <IndexPage />
        </Suspense>
        ),
    },
    {
        path: "/search",
        element: (
            <Suspense fallback={Loading}>
                <ParentModal/>
                <SearchPage/>
            </Suspense>
        ),
    },
    {
        path : "/users",
        element : (
            <Suspense fallback={Loading}>
                <ParentModal/>
                <ProfilePage/>
            </Suspense>
        ),
        children : profileRouter()
    },
    {
        path: "/post",
        element: (
            <Suspense fallback={Loading}>
                <ParentModal/>
                <PostPage />
            </Suspense>
        ),
        children: postRouter(),
    },
    {
        path: "/chat",
        element: (
            <Suspense fallback={Loading}>
                <ParentModal/>
                <ChatPage />
            </Suspense>
        ),
        children: chatRouter(),
    },
    {
        path: "/myLocation",
        element: (
            <Suspense fallback={Loading}>
                <ParentModal/>
                <MyLocationPage/>
            </Suspense>
        ),
        children : myLocationRouter()
    }

]);

export default root;
