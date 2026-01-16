import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Services/api";
import type { Category, ErrorResponse } from "./categories";
import axios from "axios";
import { subtraiMeses, ultimoDiaMesAtual } from "../../Utils/Datas";

export interface TransactionFilter {
  startDate: string;
  endDate: string;
}

export type ResponsePayload<T> = {
  success: boolean;
  data: T;
};

export type Transacao = {
  id?: string;
  titulo: string;
  valor: number;
  categoriaId: string;
  dataMovimentacao: string;
  isRecurring: boolean;
  type?: number;
  categoria?: Category;
  parcelas?: number;
};

interface TransactionState {
  periodoSelecionado: {
    items: Transacao[];
    loading: boolean;
    error: string | null;
    success: boolean;
  };

  periodoComparativo: {
    items: Transacao[];
    loading: boolean;
    error: string | null;
    success: boolean;
  };

  getSaldoTotal: number | null;
  loadingGetSaldoTotal: boolean;

  loadingGetItem: boolean;
  errorGetItem: string | null;
  selected?: Transacao | null;

  loadingPost: boolean;
  errorPost: string | null;
  successPost: string | null;

  loadingDelete: boolean;
  errorDelete: string | null;
  successDelete: string | null;

  loadingUpdate: boolean;
  errorUpdate: string | null;
  successUpdate: string | null;
}

const initialState: TransactionState = {
  periodoSelecionado: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },

  periodoComparativo: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },

  loadingUpdate: false,
  errorUpdate: null,
  successUpdate: null,

  getSaldoTotal: null,
  loadingGetSaldoTotal: false,

  loadingGetItem: false,
  errorGetItem: null,

  loadingPost: false,
  errorPost: null,
  successPost: null,

  loadingDelete: false,
  errorDelete: null,
  successDelete: null,
};

export const createTransaction = createAsyncThunk<
  ResponsePayload<Transacao>,
  Transacao,
  { rejectValue: string }
>("transactions/create", async (transaction, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("api/transacoes/novo", transaction, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const data = err.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Erro inesperado ao criar transação");
  }
});

export const updateTransaction = createAsyncThunk<
  ResponsePayload<Transacao>,
  Transacao,
  { rejectValue: string }
>("transactions/update", async (transaction, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `api/transacoes/${transaction.id}`,
      transaction,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const data = err.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Erro ao atualizar transação");
  }
});

export const fetchSaldoTotal = createAsyncThunk<
  ResponsePayload<number>,
  void,
  { rejectValue: string }
>("saldoTotal/fetch", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`api/transacoes/saldo`, {
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

export const fetchTransactionsPeriod = createAsyncThunk<
  ResponsePayload<Transacao[]>,
  TransactionFilter,
  { rejectValue: string }
>(
  "transactionsPeriod/fetch",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `api/transacoes/periodo?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const data = err.response?.data.errors[0];
        if (data) return rejectWithValue(data);
      }
      return rejectWithValue(
        "Erro ao carregar transações, recarregue a página!"
      );
    }
  }
);

export const fetchTransactionsPeriodoComparativo = createAsyncThunk<
  ResponsePayload<Transacao[]>,
  number,
  { rejectValue: string }
>("transactions/periodoComparativo", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const endDate = ultimoDiaMesAtual().toISOString();
    const startDate = subtraiMeses(ultimoDiaMesAtual(), params).toISOString();

    const response = await api.get(
      `api/transacoes/periodo?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch {
    return rejectWithValue("Erro ao carregar período comparativo");
  }
});

export const getTransacao = createAsyncThunk<
  ResponsePayload<Transacao>,
  string,
  { rejectValue: string }
>("transaction/fetch", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`api/transacoes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const data = err.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Erro ao buscar transação");
  }
});

export const deleteTransactions = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("transactions/delete", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`api/transacoes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const data = err.response?.data.errors[0];
      if (data) return rejectWithValue(data);
    }
    return rejectWithValue("Erro ao deletar transações");
  }
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearError(state) {
      state.errorPost = null;
      state.periodoSelecionado.error = null;
      state.periodoComparativo.error = null;
      state.errorDelete = null;
    },
    clearSuccess(state) {
      // state.successGet = null;
      state.successPost = null;
      state.successDelete = null;
      state.successUpdate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loadingPost = true;
        state.errorPost = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.periodoSelecionado.items.push(action.payload.data);
        state.periodoComparativo.items.push(action.payload.data);
        state.successPost = "Transação criada com sucesso";
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loadingPost = false;
        state.errorPost = action.payload || "Erro ao criar transação";
      })

      .addCase(updateTransaction.pending, (state) => {
        state.loadingUpdate = true;
        state.errorUpdate = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.periodoSelecionado.items = state.periodoSelecionado.items.map(
          (t) => (t.id === action.payload.data.id ? action.payload.data : t)
        );
        state.periodoComparativo.items = state.periodoComparativo.items.map(
          (t) => (t.id === action.payload.data.id ? action.payload.data : t)
        );
        state.successUpdate = "Transação atualizada com sucesso";
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.errorUpdate = action.payload || "Erro ao atualizar transação";
      })

      .addCase(fetchSaldoTotal.fulfilled, (state, action) => {
        state.loadingGetSaldoTotal = false;
        state.getSaldoTotal = action.payload.data;
      })

      .addCase(fetchTransactionsPeriod.pending, (state) => {
        state.periodoSelecionado.loading = true;
        state.periodoSelecionado.error = null;
      })
      .addCase(fetchTransactionsPeriod.fulfilled, (state, action) => {
        state.periodoSelecionado.loading = false;
        state.periodoSelecionado.items = action.payload.data;
        state.periodoSelecionado.success = action.payload.success;
      })
      .addCase(fetchTransactionsPeriod.rejected, (state, action) => {
        state.periodoSelecionado.loading = false;
        state.periodoSelecionado.error =
          action.payload || "Erro ao carregar transações, recarregue a página!";
      })

      .addCase(fetchTransactionsPeriodoComparativo.pending, (state) => {
        state.periodoComparativo.loading = true;
        state.periodoComparativo.error = null;
      })
      .addCase(
        fetchTransactionsPeriodoComparativo.rejected,
        (state, action) => {
          state.periodoComparativo.error =
            action.payload || "Erro ao carregar periodo!";
          state.periodoComparativo.loading = false;
        }
      )
      .addCase(
        fetchTransactionsPeriodoComparativo.fulfilled,
        (state, action) => {
          state.periodoComparativo.loading = false;
          state.periodoComparativo.items = action.payload.data;
          state.periodoComparativo.success = action.payload.success;
        }
      )

      .addCase(getTransacao.pending, (state) => {
        state.loadingGetItem = true;
        state.errorGetItem = null;
      })
      .addCase(getTransacao.fulfilled, (state, action) => {
        state.loadingGetItem = false;
        state.selected = action.payload.data;
      })
      .addCase(getTransacao.rejected, (state, action) => {
        state.loadingGetItem = false;
        state.errorGetItem = action.payload || "Erro ao carregar transação";
      })

      .addCase(deleteTransactions.pending, (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.periodoSelecionado.items = state.periodoSelecionado.items.filter(
          (item) => item.id !== action.payload
        );
        state.periodoComparativo.items = state.periodoComparativo.items.filter(
          (item) => item.id !== action.payload
        );
        state.successDelete = "Transação excluida com sucesso";
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorDelete = action.payload || "Erro ao deletar transação";
      });
  },
});

export const { clearError, clearSuccess } = transactionSlice.actions;
export default transactionSlice.reducer;
