import BasicLayout from "../../layouts/BasicLayout.jsx";
import MyLocation from "./MyLocation.jsx";

const IndexPage = () => {
    return (
        <BasicLayout>
            <div className="!w-screen bg-white">
                <MyLocation/>
            </div>
        </BasicLayout>
    );
};

export default IndexPage;