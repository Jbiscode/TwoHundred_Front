import { Outlet } from "react-router-dom";
import BasicLayout from "@layouts/BasicLayout.jsx";

function IndexPage() {
    return (
        <BasicLayout>
            <Outlet/>
        </BasicLayout>
    );
}

export default IndexPage;