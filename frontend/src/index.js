import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App'
import Home from './layouts/Home'
import store from './state/store';
import Admin from './admin/Admin';
import ProductList from './admin/components/Product/list.component';
import CreateProduct from './admin/components/Product/create.component';
import EditProduct from './admin/components/Product/edit.component';

import CategoryList from './admin/components/Category/CategoryList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Product from './components/home/Product';

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

        path: 'dashboard/product/create',
        element: <CreateProduct />,
      },
      {
        path: 'dashboard/product/edit/:id',
        element: <EditProduct />,
      },
      {
        path: '/dashboard/category',
        element: <CategoryList />
      }
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
