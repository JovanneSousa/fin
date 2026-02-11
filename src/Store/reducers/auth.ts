import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAuth from "../../Services/apiAuth";
import type { ErrorResponse } from "./categories";
import axios from "axios";
import { authStorage } from "../../Services/authStorage";
import type { ResponsePayload } from "./transactions";
import type { ResetPassFormData } from "../../components/Auth/FormReset";
import type { RegisterFormData } from "../../components/Auth/FormRegister";
import type { LoginFormData } from "../../components/Auth/FormLogin";

export interface LoginResponse {
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
}

const persisted = authStorage.hydrate();

interface AuthState {
  login: {
    loading: boolean;
    error: string | null;
  };

  register: {
    loading: boolean;
    error: string | null;
  };

  forgot: {
    loading: boolean;
    error: string | null;
    success: string | null;
  };

  reset: {
    loading: boolean;
    error: string | null;
    success: string | null;
  };

  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
  } | null;
}

const initialState: AuthState = {
  login: {
    loading: false,
    error: null,
  },

  register: {
    loading: false,
    error: null,
  },

  forgot: {
    loading: false,
    error: null,
    success: null,
  },

  reset: {
    loading: false,
    error: null,
    success: null,
  },

  isAuthenticated: persisted.isAuthenticated,
  user: persisted.user,
};

export const emitirRecoveryToken = createAsyncThunk<
  ResponsePayload<boolean>,
  { email: string },
  { rejectValue: string }
>("auth/recoverToken", async (email, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<ResponsePayload<boolean>>(
      `api/auth/forgot-password`,
      email,
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

export const resetarSenha = createAsyncThunk<
  ResponsePayload<boolean>,
  ResetPassFormData,
  { rejectValue: string }
>("auth/reset-pass", async (data, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<ResponsePayload<boolean>>(
      `api/auth/reset-pass`,
      data,
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

export const logarUsuario = createAsyncThunk<
  ResponsePayload<LoginResponse>,
  LoginFormData,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<ResponsePayload<LoginResponse>>(
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

export const registrarUsuario = createAsyncThunk<
  ResponsePayload<LoginResponse>,
  RegisterFormData,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post<ResponsePayload<LoginResponse>>(
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
    logout(state) {
      authStorage.clear();
      state.isAuthenticated = false;
      state.user = null;
    },
    clearError(state) {
      state.login.error = null;
      state.register.error = null;
      state.forgot.error = null;
      state.reset.error = null;
    },
    clearState: (state) => {
      state.login.loading = false;
      state.login.error = null;

      state.register.loading = false;
      state.register.error = null;

      state.forgot.loading = false;
      state.forgot.error = null;
      state.forgot.success = null;

      state.reset.loading = false;
      state.reset.error = null;
      state.reset.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logarUsuario.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(logarUsuario.fulfilled, (state, action) => {
        state.login.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.data.token.userToken.id!,
          name: action.payload.data.token.userToken.name!,
        };

        authStorage.save(action.payload.data.token);
      })
      .addCase(logarUsuario.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload || "Erro ao fazer login";
      })

      .addCase(registrarUsuario.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registrarUsuario.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.register.loading = false;
        state.user = {
          id: action.payload.data.token.userToken.id!,
          name: action.payload.data.token.userToken.name!,
        };

        authStorage.save(action.payload.data.token);
      })
      .addCase(registrarUsuario.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload || "Erro ao cadastrar usuário";
      })

      .addCase(emitirRecoveryToken.pending, (state) => {
        state.forgot.loading = true;
        state.forgot.error = null;
      })
      .addCase(emitirRecoveryToken.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.forgot.loading = false;
        state.forgot.success = "Verifique o email para prosseguir!";
      })
      .addCase(emitirRecoveryToken.rejected, (state, action) => {
        state.forgot.loading = false;
        state.forgot.error = action.payload || "Erro ao enviar email";
      })

      .addCase(resetarSenha.pending, (state) => {
        state.reset.error = null;
        state.reset.loading = true;
      })
      .addCase(resetarSenha.rejected, (state, action) => {
        state.reset.loading = false;
        state.reset.error = action.payload || "Erro ao resetar senha";
      })
      .addCase(resetarSenha.fulfilled, (state) => {
        state.reset.loading = false;
        state.reset.success = "Senha atualizada com sucesso!";
      });
  },
});

export const { logout, clearError, clearState } = authSlice.actions;
export default authSlice.reducer;
