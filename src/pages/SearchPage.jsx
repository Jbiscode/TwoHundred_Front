import Filter from "../components/searchPage/Filter";
import SearchPageHeader from "../components/searchPage/SearchPageHeader";
import Body from "../components/searchPage/Body";
import BasicLayout from "../layouts/BasicLayout.jsx";

function SearchPage() {
    return (
        <BasicLayout>
            <div className="search">
                <Filter/>
                <div className="result-container">
                    <SearchPageHeader/>
                    <Body/>
                </div>
            </div>
        </BasicLayout>
    );
}

export default SearchPage;
