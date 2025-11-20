import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../Services/api";
import type { AxiosError } from "axios";

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface ErrorPayload {
  status: number;
  details: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: ErrorPayload }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<LoginResponse>(
      `api/auth/login`,
      credentials
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ status: number; detail: string }>;
    if (error.response && error.response.data) {
      return rejectWithValue({
        status: error.response.data.status,
        details: error.response.data.detail,
      });
    }
    return rejectWithValue({ status: 500, details: "Erro desconhecido" });
  }
});

export const register = createAsyncThunk<
  RegisterResponse,
  { nome: string; email: string; password: string; confirmPassword: string },
  { rejectValue: ErrorPayload }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<RegisterResponse>(
      `api/auth/registrar`,
      userData
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ status: number; detail: string }>;
    if (error.response && error.response.data) {
      return rejectWithValue({
        status: error.response.data.status,
        details: error.response.data.detail,
      });
    }
    return rejectWithValue({ status: 500, details: "Erro desconhecido" });
  }
});

export const wake = createAsyncThunk<string, void, { rejectValue: string }>(
  "wake-up",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<string>(`api/auth/wake-up`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Erro ao acordar API");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: AuthState) => {
      state.loading = true;
      state.error = null;
    };

    const setRejected = (
      state: AuthState,
      action:
        | ReturnType<typeof login.rejected>
        | ReturnType<typeof register.rejected>
    ) => {
      state.loading = false;
      state.error =
        (action.payload && action.payload.details) ||
        (action.payload && `Erro ${action.payload.status}`) ||
        action.error.message ||
        "Erro ao processar requisição.";
    };

    builder
      .addCase(login.pending, setPending)
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(login.rejected, setRejected)
      .addCase(register.pending, setPending)
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(register.rejected, setRejected);
  },
});

export const { logout, clearError, clearState } = authSlice.actions;
export default authSlice.reducer;
