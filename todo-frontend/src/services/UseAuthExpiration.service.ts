import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number;
  sub: string;
}

export const useAuthExpiration = (token: string | null, onLogout: () => void) => {
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expirationTime = decoded.exp * 1000; // convert seconds → ms
      const currentTime = Date.now();

      if (expirationTime <= currentTime) {
        // already expired
        onLogout();
        return;
      }

      // schedule logout at expiry
      const timeout = setTimeout(() => {
        onLogout();
      }, expirationTime - currentTime);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      onLogout();
    }
  }, [token, onLogout]);
};
