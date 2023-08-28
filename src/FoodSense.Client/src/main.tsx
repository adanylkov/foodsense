import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AddFood } from './Pages/AddFood';
import React from 'react';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FoodPage } from './Pages/FoodPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ExpirationPage } from './Pages/ExpirationPage';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Notifications />
            <Router>
                <Routes>
                    <Route path="/" element={<FoodPage />} />
                    <Route path="/add" element={<AddFood />} >
                        <Route path=":barcode" />
                    </Route>
                    <Route path="/expiration" element={<ExpirationPage />} >
                        <Route path=":barcode" />
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
);
