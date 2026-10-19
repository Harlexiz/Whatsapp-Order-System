import { createBrowserRouter } from 'react-router-dom'
import HomePage from './components/HomePage'
import AdminLayout from './components/admin/AdminLayout'
import Protected from './components/admin/Protected'
import Dashboard from './components/admin/children/Dashboard'



export const router = createBrowserRouter([
    {
        path: "",
        element: <HomePage />,
    },

    {
        path: "/admin/login",
        element: <div>Admin Login</div>
    },
    {
        path: '/admin',
        element: (
            <Protected>

                <AdminLayout />

            </Protected>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'order',
                element: <div>Orders</div>
            },
            {
                path: 'product',
                element: <div>Produsts</div>
            }
        ]
    },
    {
        path: "*",
        element: <div>Page not found</div>,
    },
])