import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Product from './views/Product';
import NewProduct from './views/NewProduct';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Product />,
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
            },
        ],
    },
]);
