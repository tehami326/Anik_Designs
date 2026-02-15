import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0b1120] text-white flex">

            {/* Sidebar */}
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">

                <AdminTopbar setSidebarOpen={setSidebarOpen} />

                <main className="
                    flex-1
                    w-full
                    px-4 sm:px-6 md:px-10 xl:px-16
                    py-8 md:py-12
                ">
                    {children}
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;
