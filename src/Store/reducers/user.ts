import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ResponsePayload } from "./transactions";
import api from "../../Services/api";
import axios from "axios";
import type { ErrorResponse } from "./categories";
import { logarUsuario } from "./auth";

interface User {
  id: string;
  nome: string;
  email: string;
}

interface UsuarioState {
  fetch: {
    user: User | null;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
}

const initialState: UsuarioState = {
  fetch: {
    user: null,
    error: null,
    status: "idle",
  },
};

export const getUserData = createAsyncThunk<
  ResponsePayload<User>,
  void,
  { rejectValue: string }
>("usuarios/get", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("api/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError<ErrorResponse>(e)) {
      const data = e.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Houve um erro desconhecido!");
  }
});

const usuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logarUsuario.fulfilled, () => initialState)
      .addCase(getUserData.pending, (state) => {
        state.fetch.status = "loading";
        state.fetch.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.fetch.error = action.payload || "erro desconhecido";
        state.fetch.status = "failed";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.fetch.status = "succeeded";
        state.fetch.user = action.payload.data;
      });
  },
});

export default usuarioSlice.reducer;
