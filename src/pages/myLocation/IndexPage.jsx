import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout.jsx";
import MyLocation from "./MyLocation.jsx";

const IndexPage = () => {
    return (
        <BasicLayout>
            <Outlet/>
        </BasicLayout>
    );
};

export default IndexPage;