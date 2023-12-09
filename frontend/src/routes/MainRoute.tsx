import { lazy } from 'react';
// project imports
import HomeLayout from '../views/layouts/HomeLayout';
import Marketplace from '../views/Marketplace/MarketplaceNav';
import Events from '../views/Events/EventsView';
import FeedShare from '../views/FeedShare/FeedShareView';
import Home from '../views/Home/Home';
import Happenings from '../views/HappeningsView';
import SinglePost from '../happenings-page/single-post/single-post';
import CreatePost from '../happenings-page/create-post/create-post';
import WeatherView from '../views/Weather/WeatherView';
import Donations from '../views/Donations/DonationsView';
import Login from '../views/LoginPage/login';
import Register from '../views/RegisterPage/register';
import UserProfile from '../views/UserProfile/UserProfileView';

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
            path: '/donations',
            element: <Donations />
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
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/userProfile',
            element: <UserProfile/>
        }
    ]
};

export default MainRoutes;

