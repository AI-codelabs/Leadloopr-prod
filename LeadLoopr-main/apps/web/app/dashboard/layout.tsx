import { AppSidebar } from "@/components/layout/app-sidebar";
import { OrganizationCheck } from "@/components/organization/OrganizationCheck";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OrganizationCheck>
            <div className="flex h-screen bg-white">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </OrganizationCheck>
    );
} 