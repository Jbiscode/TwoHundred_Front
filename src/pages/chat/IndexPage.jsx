import BasicLayout from "@layouts/BasicLayout.jsx";
import {Outlet} from "react-router-dom";

function IndexPage() {
    return (
        <BasicLayout>
                <Outlet/>
        </BasicLayout>
    );
}

export default IndexPage;