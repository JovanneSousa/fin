import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../Services/api";

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

interface AuthState {
  token: string | null
  loading: boolean
  error: string | null
}


const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string }
>('auth/login', async (credentials) => {
        const response = await api.post<LoginResponse>(`api/auth/login`, credentials)
        return response.data
})

export const register = createAsyncThunk<
  RegisterResponse,
  { nome: string; email: string; password: string; confirmPassword: string }
>('auth/register', async (userData) => {
    const response = await api.post<RegisterResponse>(
      `api/auth/registrar`,
      userData
    )
    return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: AuthState) => {
      state.loading = true
      state.error = null
    }
    const setRejected = (state: AuthState, action: PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload
    }

    builder
      .addCase(login.pending, setPending)
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false
          state.token = action.payload.token
          localStorage.setItem('token', action.payload.token)
        }
      )
      .addCase(login.rejected, setRejected)
  },
})


export const { logout, clearError } = authSlice.actions
export default authSlice.reducer