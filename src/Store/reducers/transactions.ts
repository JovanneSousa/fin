import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Services/api";
import type { RootReducer } from "..";
import type { Category } from "./categories";

export interface TransactionFilter {
  startDate: string;
  endDate: string;
}

export interface Transacao {
  id?: string;
  titulo: string;
  valor: number;
  categoriaId: string;
  createdAt: string;
  isRecurring: boolean;
  type?: number;
  categoria?: Category;
  parcelas?: number;
}

interface TransactionState {
  items: Transacao[];
  selected?: Transacao | null;

  loadingGet: boolean;
  errorGet: string | null;

  loadingGetItem: boolean;
  errorGetItem: string | null;

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
  items: [],

  loadingUpdate: false,
  errorUpdate: null,
  successUpdate: null,

  loadingGet: false,
  errorGet: null,

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

export const updateTransaction = createAsyncThunk<
  Transacao,
  Transacao,
  { rejectValue: string }
>("transactions/update", async (transaction, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    const response = await api.post(
      `api/transacoes/${transaction.id}`,
      transaction,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Erro ao atualizar transação");
  }
});

// export const fetchTransactions = createAsyncThunk<
//   Transacao[],
//   void,
//   { rejectValue: string }
// >("transactions/fetch", async (_, { getState, rejectWithValue }) => {
//   try {
//     const state = getState() as RootReducer;
//     const token = state.auth.token || localStorage.getItem("token");

//     const response = await api.get("api/transacoes", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data || "Erro ao carregar transações, recarregue a página!"
//     );
//   }
// });

export const fetchTransactionsPeriod = createAsyncThunk<
  Transacao[],
  TransactionFilter,
  { rejectValue: string }
>(
  "transactionsPeriod/fetch",
  async ({ startDate, endDate }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootReducer;
      const token = state.auth.token || localStorage.getItem("token");

      const response = await api.get(
        `api/transacoes/periodo?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data ||
          "Erro ao carregar transações, recarregue a página!"
      );
    }
  }
);

export const getTransacao = createAsyncThunk<
  Transacao,
  string,
  { rejectValue: string }
>("transaction/fetch", async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    const response = await api.get(`api/transacoes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Erro ao buscar transação");
  }
});

export const deleteTransactions = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("transactions/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    await api.delete(`api/transacoes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Erro ao deletar transações");
  }
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearError(state) {
      state.errorPost = null;
      state.errorGet = null;
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
        state.items.push(action.payload);
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
        state.items = state.items.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        state.successUpdate = "Transação atualizada com sucesso";
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.errorUpdate = action.payload || "Erro ao atualizar transação";
      })

      // .addCase(fetchTransactions.pending, (state) => {
      //   state.loadingGet = true;
      //   state.errorGet = null;
      // })
      // .addCase(fetchTransactions.fulfilled, (state, action) => {
      //   state.loadingGet = false;
      //   state.items = action.payload;
      // })
      // .addCase(fetchTransactions.rejected, (state, action) => {
      //   state.loadingGet = false;
      //   state.errorGet =
      //     action.payload || "Erro ao carregar transações, recarregue a página!";
      // })

      .addCase(fetchTransactionsPeriod.pending, (state) => {
        state.loadingGet = true;
        state.errorGet = null;
      })
      .addCase(fetchTransactionsPeriod.fulfilled, (state, action) => {
        state.loadingGet = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactionsPeriod.rejected, (state, action) => {
        state.loadingGet = false;
        state.errorGet =
          action.payload || "Erro ao carregar transações, recarregue a página!";
      })

      .addCase(getTransacao.pending, (state) => {
        state.loadingGetItem = true;
        state.errorGetItem = null;
      })
      .addCase(getTransacao.fulfilled, (state, action) => {
        state.loadingGetItem = false;
        state.selected = action.payload;
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
        state.items = state.items.filter((item) => item.id !== action.payload);
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
