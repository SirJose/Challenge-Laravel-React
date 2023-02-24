import { Navigate, createBrowserRouter } from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import Newsfeed from './views/Newsfeed';
import NotFound from './views/NotFound';

import Layout from './components/Layout';
import GuestLayout from './components/GuestLayout';
import Settings from './views/Settings';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                // element: <Navigate to="/users" />
                element: <Newsfeed />
            },
            {
                path: '/newsfeed',
                element: <Newsfeed />
            }
        ]
    },
    {
        path: '/settings',
        element: <Settings />
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Newsfeed />
            },
            {
                path: '/newsfeed',
                element: <Newsfeed />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
