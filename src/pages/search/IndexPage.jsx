import FilterComponent from "../../components/search/FilterComponent.jsx";
import HeaderComponent from "../../components/search/HeaderComponent.jsx";
import SearchArticleComponent from "../../components/search/SearchArticleComponent.jsx";
import BasicLayout from "../../layouts/BasicLayout.jsx";


function IndexPage() {

    return (
        <BasicLayout>
            <div className="!w-screen bg-white">
                <FilterComponent />
                <HeaderComponent />
                <SearchArticleComponent />
            </div>
        </BasicLayout>
    );
}

export default IndexPage;
