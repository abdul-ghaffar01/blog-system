import ProtectedRoute from "@/components/admin/ProtectedRoute";

export default function AdminLayout({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}
