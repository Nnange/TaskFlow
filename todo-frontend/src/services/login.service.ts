import { LoginData } from "../interfaces/Login.interface"
import { RegisterData } from "../interfaces/Register.interface"
import { api } from "./api"

export const Login = async (data?: LoginData) => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const SignUp = async (data?: RegisterData) => {
  const response = await api.post('/auth/signup', data)
  return response.data
}