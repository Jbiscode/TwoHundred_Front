import { Outlet } from "react-router-dom";
import BasicHeader from "@layouts/BasicHeader";
import BasicFooter from "@layouts/BasicFooter";

function BasicLayout({children}) {
    return (
        <div className="flex flex-col min-h-screen">
            <BasicHeader />
            <main className="flex-grow mx-auto">
                {children}
            </main>
            <BasicFooter />
        </div>
    );
}

export default BasicLayout;