import AdminHeader from "@/components/admin/Header";
import ThreePanelLayout from "@/components/admin/Panels";
import Preview from "@/components/admin/Preview";
import React from "react";

const Page = () => {
    return (
        <div className="flex flex-col h-screen"> {/* full viewport height */}
            {/* Header takes its natural height */}
            <div className="flex-none">
                <AdminHeader />
            </div>

            {/* Panels fill the rest */}
            <div className="flex-1 min-h-0"> {/* min-h-0 is important for scrollable flex children */}
                <ThreePanelLayout
                    left={<Preview />}
                    center={<div>Main Editor</div>}
                    right={<Preview />}
                />
            </div>
        </div>
    );
};

export default Page;
