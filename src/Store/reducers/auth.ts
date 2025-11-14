import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../components/Services/api";

interface LoginResponse {
  token: string;
}

// interface RegisterResponse {
//   token: string;
// }

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string }
>('auth/login', async (credentials) => {
        const response = await api.post<LoginResponse>(`auth/login`, credentials)
        return response.data
})
