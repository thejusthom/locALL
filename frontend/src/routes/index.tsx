import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([MainRoutes]);
}