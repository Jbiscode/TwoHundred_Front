import Header from "@components/Header";
import Filter from "../components/searchPage/Filter";
import SearchPageHeader from "../components/searchPage/SearchPageHeader";
import Body from "../components/searchPage/Body";

function SearchPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Header />
        <div className="search">
          <Filter />
          <div className="result-container">
            <SearchPageHeader />
            <Body />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
