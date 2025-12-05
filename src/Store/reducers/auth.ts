import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import apiAuth from "../../Services/apiAuth";

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
          }
        ];
      };
    };
  };
}

const salvaDados = (data: LoginResponse) => {
  localStorage.setItem("token", data.data.token.accessToken);
  localStorage.setItem("user", data.data.token.userToken.name);
  localStorage.setItem("userId", data.data.token.userToken.id);
  localStorage.setItem("expiresIn", (Date.now() + data.data.token.expiresIn * 1000).toString());
};

interface AuthState {
  loading: boolean;
  error: string | null;
}

interface ErrorPayload {
  status: number;
  details: string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: ErrorPayload }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<LoginResponse>(
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
    return rejectWithValue({ status: 500, details: "Falha na conexão" });
  }
});

export const register = createAsyncThunk<
  LoginResponse,
  { nome: string; email: string; password: string; confirmPassword: string },
  { rejectValue: ErrorPayload }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<LoginResponse>(
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
      const response = await apiAuth.get<string>(`api/auth/wake-up`);
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
    logout() {
      localStorage.clear()
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
          salvaDados(action.payload)
        }
      )
      .addCase(login.rejected, setRejected)
      .addCase(register.pending, setPending)
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          salvaDados(action.payload)
        }
      )
      .addCase(register.rejected, setRejected);
  },
});

export const { logout, clearError, clearState } = authSlice.actions;
export default authSlice.reducer;
