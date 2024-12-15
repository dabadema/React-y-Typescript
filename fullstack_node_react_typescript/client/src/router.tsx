import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Product, { loader as productsLoader } from './views/Product';
import NewProduct, { action as newProductAction } from './views/NewProduct';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Product />,
                loader: productsLoader,
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction,
            },
        ],
    },
]);
