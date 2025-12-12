import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../Services/api";
import axios from "axios";

export interface ErrorRespone {
  success: boolean;
  errors: string[];
}

export interface Category {
  id: string;
  name: string;
  type: number;
}

export type ResponsePayload = {
  success: boolean;
  data: Category[];
};

interface CategoriesState {
  receita: Category[];
  despesa: Category[];

  loadingGet: boolean;
  errorGet: string | null;
  successGet: string | null;

  loadingPost: boolean;
  errorPost: string | null;
  successPost: string | null;

  loadingDelete: boolean;
  errorDelete: string | null;
  successDelete: string | null;
}

const initialState: CategoriesState = {
  receita: [] as Category[],
  despesa: [] as Category[],

  loadingGet: false,
  errorGet: null as string | null,
  successGet: null as string | null,

  loadingPost: false,
  errorPost: null as string | null,
  successPost: null as string | null,

  loadingDelete: false,
  errorDelete: null as string | null,
  successDelete: null as string | null,
};

export const getCategories = createAsyncThunk<
  ResponsePayload,
  void,
  { rejectValue: string }
>("categories/fetch", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get<ResponsePayload>("api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorRespone>(err)) {
      const erro = err.response?.data.errors;
      if (erro) return rejectWithValue(erro[0]);
    }
    return rejectWithValue("Houve um erro ao buscar as categorias!");
  }
});

export const postCategories = createAsyncThunk<
  ResponsePayload,
  { name: string; type: number },
  { rejectValue: string }
>("categories/post", async ({ name, type }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post<ResponsePayload>(
      "api/categories",
      { name, type },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorRespone>(err)) {
      const data = err.response?.data.errors;
      if (data) return rejectWithValue(data[0]);
    }
    return rejectWithValue("Erro inesperado ao adicionar categoria");
  }
});

export const deleteCategories = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categories/delete", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`api/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorRespone>(err)) {
      const data = err.response?.data.errors;
      if (data) return rejectWithValue(data[0]);
    }
    return rejectWithValue("Erro inesperado ao deletar a categoria!");
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearError(state) {
      state.errorPost = null;
      state.errorGet = null;
      state.errorDelete = null;
    },
    clearSuccess(state) {
      state.successGet = null;
      state.successPost = null;
      state.successDelete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loadingGet = true;
        state.errorGet = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ResponsePayload>) => {
          state.loadingGet = false;
          state.receita = action.payload.data.filter((c) => c.type === 1);
          state.despesa = action.payload.data.filter((c) => c.type === 0);
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingGet = false;
        state.errorGet = action.payload || "Erro ao carregar categorias";
      });

    builder.addCase(postCategories.pending, (state) => {
      state.loadingPost = true;
      state.errorPost = null;
    });
    builder.addCase(
      postCategories.fulfilled,
      (state, action: PayloadAction<ResponsePayload>) => {
        state.loadingPost = false;

        const categoria = action.payload.data[0];
        if (!categoria) return;

        const isReceita = categoria.type === 1;
        (isReceita ? state.receita : state.despesa).push(categoria);
        state.successPost = "Categoria adicionada com sucesso!";
      }
    );
    builder.addCase(postCategories.rejected, (state, action) => {
      state.loadingPost = false;
      state.errorPost = action.payload || "Erro ao adicionar categoria";
    });

    builder.addCase(deleteCategories.pending, (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
    });
    builder.addCase(deleteCategories.rejected, (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload || "Erro ao deletar essa categoria";
    });
    builder.addCase(
      deleteCategories.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loadingDelete = false;
        state.receita = state.receita.filter((c) => c.id !== action.payload);
        state.despesa = state.despesa.filter((c) => c.id !== action.payload);
        state.successDelete =
          state.successDelete || "Categoria deletada com sucesso";
      }
    );
  },
});

export const { clearError, clearSuccess } = categoriesSlice.actions;
export default categoriesSlice.reducer;
