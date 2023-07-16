import ReactDOM from 'react-dom/client';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import { AddFood } from './Pages/FoodPage';
import React from 'react';
import { Notifications } from '@mantine/notifications';

const router = createBrowserRouter([
    {
        path: "/add",
        element: <AddFood />
    }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Notifications />
        <RouterProvider router={router} />
    </React.StrictMode>
);
