import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import { AddFood } from './Pages/AddFood';
import React from 'react';
import { Notifications } from '@mantine/notifications';
import { FoodPage } from './Pages/FoodPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
    {
        path: "/add",
        element: <AddFood />
    },
    {
        path: "/",
        element: <FoodPage />
    }]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <Notifications />
            <RouterProvider router={router} />
        </React.StrictMode>
    </QueryClientProvider>
);
