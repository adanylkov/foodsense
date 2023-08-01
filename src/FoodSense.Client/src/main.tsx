import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import { AddFood } from './Pages/AddFood';
import React from 'react';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FoodPage } from './Pages/FoodPage';

const router = createBrowserRouter([
    {
        path: "/add",
        element: <AddFood />
    },
    {
        path: "/",
        element: <FoodPage />
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Notifications />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
