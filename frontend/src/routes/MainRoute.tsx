import { lazy } from 'react';
// project imports
import HomeLayout from '../views/layouts/HomeLayout';
import Marketplace from '../views/Marketplace';
import Events from '../views/EventsView';
import FeedShare from '../views/FeedShareView';
import Home from '../views/Home';
import Happenings from '../views/HappeningsView';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <HomeLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/marketplace',
            element: <Marketplace />
        },
        {
            path: '/events',
            element: <Events />
        },
        {
            path: '/feedshare',
            element: <FeedShare />
        },
        {
            path: '/happenings',
            element: <Happenings />
        }
    ]
};

export default MainRoutes;

