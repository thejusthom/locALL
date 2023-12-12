import { lazy } from 'react';
// project imports
import HomeLayout from '../views/layouts/HomeLayout';
import Marketplace from '../views/Marketplace/MarketplaceNav';
import Events from '../views/Events/EventsView';
import FeedShare from '../views/FeedShare/FeedShareView';
import Home from '../views/Home';
import Happenings from '../views/HappeningsView';
import SinglePost from '../happenings-page/single-post/single-post';
import CreatePost from '../happenings-page/create-post/create-post';

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
            element: <FeedShare/>
        },
        {
            path: '/happenings',
            element: <Happenings />
        },
        {
            path: `/happenings/:happeningId`,
            element: <SinglePost />
        },
        {
            path: '/happenings/createPost',
            element: <CreatePost />
        }
    ]
};

export default MainRoutes;

