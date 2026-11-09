import { createBrowserRouter } from 'react-router-dom'
import HomePage from './components/HomePage'
import AdminLayout from './components/admin/AdminLayout'
import Protected from './components/admin/Protected'
import Login from './components/admin/Login'
import AdminProducts from './components/admin/children/Products/AdminProducts'
import Dashboard from './components/admin/children/Dashboard/Dashboard'




export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },

    {
        path: "/admin/login",
        element: <Login />
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
                element: <AdminProducts />
            }, {
                path: 'profile',
                element: <div>Profile</div>,
                
            }
        ]
    },
    {
        path: "*",
        element: <div>Page not found</div>,
    },
])