import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import App from "./App";
import { useDispatch, useSelector } from "react-redux";


export function AppRouter() {
    // Access authentication state from Redux store
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
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