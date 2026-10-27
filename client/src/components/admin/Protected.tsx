import React, { useEffect, useState, type ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/adminQuery';


interface ProtectedProps {
    children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    // const { data: admin, isLoading } = useAdminQuery();

    const { data: admin, isLoading } = useCurrentUser()
    const location = useLocation();

    if (isLoading) {
        return (
            <div className='flex items-center justify-center flex-col gap-1.5 h-screen'>
                <div
                    className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-custom-gold"
                    role="status"
                    aria-label="Loading"
                >
                </div>
                <p className='text-gray-500 text-sm'>Please wait...</p>
            </div>
        )
    }

    if (!admin) {
        // Remember where they were trying to go, so login can send them back
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
}
