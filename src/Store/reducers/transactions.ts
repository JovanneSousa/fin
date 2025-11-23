import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Services/api";
import type { RootReducer } from "..";
import type { Category } from "./categories";

export interface Transacao {
  id?: string;
  titulo: string;
  valor: number;
  categoriaId: string;
  createdAt: string;
  isRecurring: boolean;
  type?: number;
  categoria?: Category
}

interface TransactionState {
  items: Transacao[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  items: [],
  loading: false,
  error: null,
};

export const createTransaction = createAsyncThunk<
  Transacao,
  Transacao,
  { rejectValue: string }
>("transactions/create", async (transaction, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    const response = await api.post("api/transacoes/novo", transaction, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Erro ao criar transação");
  }
});

export const fetchTransactions = createAsyncThunk<
  Transacao[],
  void,
  { rejectValue: string }
>("transactions/fetch", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    const response = await api.get("api/transacoes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Erro ao carregar transações");
  }
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao criar transação";
      })

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao carregar transações";
      });
  },
});

export const {} = transactionSlice.actions
export default transactionSlice.reducer;
