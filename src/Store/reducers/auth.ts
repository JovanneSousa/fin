import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import apiAuth from "../../Services/apiAuth";
import type { ErrorResponse } from "./categories";
import axios from "axios";

interface LoginResponse {
  sucess: boolean;
  data: {
    token: {
      accessToken: string;
      expiresIn: number;
      userToken: {
        id: string;
        name: string;
        claims: [
          {
            value: string;
            type: string;
          },
        ];
      };
    };
  };
}

const salvaDados = (response: LoginResponse) => {
  localStorage.setItem("token", response.data.token.accessToken);
  localStorage.setItem("user", response.data.token.userToken.name);
  localStorage.setItem("userId", response.data.token.userToken.id);
  localStorage.setItem(
    "expiresIn",
    (Date.now() + response.data.token.expiresIn * 1000).toString(),
  );
};

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<LoginResponse>(
      `api/auth/login`,
      credentials,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const data = err.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Falha na conexão");
  }
});

export const register = createAsyncThunk<
  LoginResponse,
  {
    nome: string;
    email: string;
    password: string;
    confirmPassword: string;
    system: string;
    profile: string;
  },
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<LoginResponse>(
      `api/auth/registrar`,
      userData,
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const data = err.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Erro desconhecido");
  }
});

export const wake = createAsyncThunk<string, void, { rejectValue: string }>(
  "wake-up",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get<string>(`api/auth/wake-up`);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const data = err.response?.data.errors[0];
        if (data) return rejectWithValue(data);
      }
      return rejectWithValue("Erro ao acordar API");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      localStorage.clear();
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
        | ReturnType<typeof register.rejected>,
    ) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    builder
      .addCase(login.pending, setPending)
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          salvaDados(action.payload);
        },
      )
      .addCase(login.rejected, setRejected)
      .addCase(register.pending, setPending)
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          salvaDados(action.payload);
        },
      )
      .addCase(register.rejected, setRejected);
  },
});

export const { logout, clearError, clearState } = authSlice.actions;
export default authSlice.reducer;
