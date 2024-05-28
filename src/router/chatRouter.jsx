import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";


const Loading = <div>Loading....</div>
const ChatList = lazy(() => import("@pages/chat/ChatListPage"))
const ChatRoom = lazy(() => import("@pages/chat/ChatRoomPage"))

const chatRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace={true} to="list"/>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><ChatList/></Suspense>
        },
        {
            path: "room/:rid",
            element:  <Suspense fallback={Loading}><ChatRoom/></Suspense>
        }
    ]
}

export default chatRouter;