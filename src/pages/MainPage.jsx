// import { MainResponse } from "../api/mainApi.jsx";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import MainContent from "@components/MainContent";

function MainPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

export default MainPage;
