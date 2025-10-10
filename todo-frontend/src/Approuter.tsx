import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import App from "./App";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Register from "./pages/Register";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { useAuthExpiration } from "./services/UseAuthExpiration.service";


export default function AppRouter() {
  const savedAuth = JSON.parse(
      localStorage.getItem("auth") || 
      sessionStorage.getItem("auth") ||
      "null"
    );
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) || (savedAuth?.token !== null) && (savedAuth?.token !== undefined);
    const token = savedAuth?.token;
    
    const handleLogout = () => {
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
      window.location.href = '/login';
    };
    // Use the custom hook to handle token expiration
    useAuthExpiration(token, handleLogout);
    

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/auth/verify" element={<EmailVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route 
                path="/"
                element={isAuthenticated ? <App/> : <Navigate to="/login"/>}
            />
        </Routes>
    </BrowserRouter>
  )
}