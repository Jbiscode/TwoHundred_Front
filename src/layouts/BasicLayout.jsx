
import BasicHeader from "@layouts/BasicHeader";
import BasicFooter from "@layouts/BasicFooter";

function BasicLayout({ children }) {
    return (
    <>
        <BasicHeader />
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow mx-auto">{children}</main>
        </div>
        <BasicFooter />
    </>
    );
}

export default BasicLayout;
