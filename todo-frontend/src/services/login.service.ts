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

export const ForgotPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email })
    .then(res => {
      console.log(res.data)})
    .catch(err => console.log(err.response.data))
  console.log(response)
}

export const ResetPassword = async (token: string, newPassword: string) => {
  const response = await api.post('/auth/reset-password', { token, newPassword })
  return response.data
}