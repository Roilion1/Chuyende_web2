import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App'
import Home from './layouts/Home'
import store from './state/store';
import Admin from './admin/Admin';
import ProductList from './admin/components/Product/ListProduct';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Product from './components/home/Product';
import Widgets from './components/home/Widgets';
import ShoppingCart from './components/pages/ShoppingCart';
import ProductDetail from './components/pages/ProductDetail';
import Checkout from './components/pages/Checkout';
import CreateProduct from './admin/components/Product/CreateProduct';
import EditProduct from './admin/components/Product/EditProduct';
import CategoryList from './admin/components/Category/CategoryList';
import CreateCategory from './admin/components/Category/CreateCategory';
import EditCategory from './admin/components/Category/EditCategory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'products',
        element: <Product />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetail />,
      },
      {
        path: 'widgets',
        element: <Widgets />,
      },
      {
        path: 'shopping-cart',
        element: <ShoppingCart />,
      },
      {
        path: 'Checkout',
        element: <Checkout />,
      },

    ]
  },
  {
    path: '/dashboard',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <ProductList />
      },
      {
        path: 'product/create',
        element: <CreateProduct />,
      },
      {
        path: 'product/edit/:id',
        element: <EditProduct />,
      },
      {
        path: '/dashboard/category',
        element: <CategoryList />,
      },
      {
        path: '/dashboard/category/create',
        element: <CreateCategory />,
      },
      {
        path: '/dashboard/category/edit/:id',
        element: <EditCategory />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
