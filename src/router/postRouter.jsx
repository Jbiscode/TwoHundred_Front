import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";

const Loading = <div>Loading....</div>
const PostList = lazy(() => import("@pages/post/ListPage.jsx"))
const PostRead = lazy(() => import("@pages/post/ReadPage.jsx"))
const PostAdd = lazy(() => import("@pages/post/AddPage.jsx"))
const PostModify = lazy(() => import("@pages/post/ModifyPage.jsx"))

const postRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace={true} to="list"/>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><PostList/></Suspense>
        },
        {
            path: "read",
            element:  <Suspense fallback={Loading}><PostRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><PostAdd/></Suspense>
        },
        {
            path: "modify",
            element: <Suspense fallback={Loading}><PostModify/></Suspense>
        }
    ]
}

export default postRouter;