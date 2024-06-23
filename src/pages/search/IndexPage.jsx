import BasicLayout from "../../layouts/BasicLayout.jsx";
import Search from "./Search.jsx";

function IndexPage() {
    return (
        <BasicLayout>
            <div className="!w-screen bg-white">
                <Search/>
            </div>
        </BasicLayout>
    );
}

export default IndexPage;
