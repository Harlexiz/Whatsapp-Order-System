import React, { useEffect, useState, type ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


interface ProtectedProps {
    children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    // const { data: admin, isLoading } = useAdminQuery();
    const location = useLocation();

    const admin: boolean = true

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div className="p-6">Checking access...</div>;
    }

    if (!admin) {
        // Remember where they were trying to go, so login can send them back
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
}
