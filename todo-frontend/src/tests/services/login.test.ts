import { describe, it, expect, beforeEach } from 'vitest';
import { api } from '../../services/api';
import AxiosMockAdapter from 'axios-mock-adapter';
import { Login, SignUp } from '../../services/login.service';
import { LoginData } from '../../interfaces/Login.interface';
import { RegisterData } from '../../interfaces/Register.interface';

const mock = new AxiosMockAdapter(api);

describe('authApi', () => {
  beforeEach(() => {
    mock.reset(); // Reset the mock before each test
  });

  it('should log in a user and return a token', async () => {
    const mockToken = 'mockToken';
    const loginData: LoginData = { email: 'validUser', password: 'validPassword' };
    mock.onPost('/auth/login', loginData).reply(200, { token: mockToken }); // Mock the login request

    const token = await Login(loginData);
    expect(token).toEqual({ token: mockToken }); // Check if the returned token matches the mock
  });

  it('should sign up a new user and return user data', async () => {
    const newUser: RegisterData = { username: 'newUser', email: "validEmail@test.com", password: 'newPassword' };
    const mockResponse = { id: '1', username: 'newUser' };

    mock.onPost('/auth/signup', newUser).reply(201, mockResponse); // Mock the signup request

    const user = await SignUp(newUser);
    expect(user).toEqual(mockResponse); // Check if the returned user data matches the mock
  });
});