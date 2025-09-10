import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import App from "./App";


export function AppRouter() {
    const isAuthenticated = false; // Replace with actual authentication logic
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
                path="/"
                element={isAuthenticated ? <App/> : <Navigate to="/login"/>}
            />
        </Routes>
    </BrowserRouter>
  )
}