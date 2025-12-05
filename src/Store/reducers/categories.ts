import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../Services/api";

export interface Category {
  id: string;
  name: string;
  type: number;
}

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

export const getCategories = createAsyncThunk<Category[]>(
  "categories/fetch",
  async () => {
    const token = localStorage.getItem("token");

    const response = await api.get<Category[]>("api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const postCategories = createAsyncThunk<
  Category,
  { name: string; type: number },
  { rejectValue: string }
>("categories/post", async ({ name, type }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post<Category>(
      "api/categories",
      { name, type },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue("Erro inesperado ao adicionar categoria");
  }
});

export const deleteCategories = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "categories/delete",

  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Erro inesperado ao deletar categoria";
      return rejectWithValue(message);
    }
  }
);

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
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loadingGet = false;
        state.receita = action.payload.filter((c) => c.type === 1);
        state.despesa = action.payload.filter((c) => c.type === 0);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingGet = false;
        state.errorGet = action.error.message || "Erro ao carregar categorias";
      });

    builder.addCase(postCategories.pending, (state) => {
      state.loadingPost = true;
      state.errorPost = null;
    });
    builder.addCase(
      postCategories.fulfilled,
      (state, action: PayloadAction<Category>) => {
        state.loadingPost = false;
        if (action.payload.type === 1) {
          state.receita.push(action.payload);
        } else {
          state.despesa.push(action.payload);
        }
        state.successPost = "Categoria adicionada com sucesso!";
      }
    );
    builder.addCase(postCategories.rejected, (state, action) => {
      state.loadingPost = false;
      if (action.payload) {
        state.errorPost = action.payload as string;
      } else {
        state.errorPost = action.error.message || "Erro ao adicionar categoria";
      }
    });

    builder.addCase(deleteCategories.pending, (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
    });
    builder.addCase(deleteCategories.rejected, (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload as string;
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
