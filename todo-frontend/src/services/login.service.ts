import { LoginData } from "../interfaces/Login.interface"
import { api } from "./api"

export const Login = async (data?: LoginData) => {
  const response = await api.post('/auth/login', data)
  return response.data
}