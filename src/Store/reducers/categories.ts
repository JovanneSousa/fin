import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../Services/api";
import type { RootReducer } from "..";

interface Category {
  id: number;
  name: string;
  type: number;
}

interface CategoriesState {
  receita: Category[];
  despesa: Category[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: CategoriesState = {
  receita: [] as Category[],
  despesa: [] as Category[],
  loading: false,
  error: null as string | null,
  success: null as string | null,
};

export const getCategories = createAsyncThunk<Category[]>(
  "categories/fetch",
  async (_, { getState }) => {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

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
>("categories/post", async ({ name, type }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

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

export const deleteCategories = createAsyncThunk<number, number>(
  "categories/delete",
  async (id, { getState }) => {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    await api.delete<number>(`api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.receita = action.payload.filter((c) => c.type === 1);
        state.despesa = action.payload.filter((c) => c.type === 0);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar categorias";
      });

    builder.addCase(postCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      postCategories.fulfilled,
      (state, action: PayloadAction<Category>) => {
        state.loading = false;
        if (action.payload.type === 1) {
          state.receita.push(action.payload);
        } else {
          state.despesa.push(action.payload);
        }
        state.success = "Categoria adicionada com sucesso!";
      }
    );
    builder.addCase(postCategories.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload as string;
      } else {
        state.error = action.error.message || "Erro ao adicionar categoria";
      }
    });

    builder.addCase(deleteCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Erro ao deletar categoria";
    });
    builder.addCase(
      deleteCategories.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.receita = state.receita.filter((c) => c.id !== action.payload);
        state.despesa = state.despesa.filter((c) => c.id !== action.payload);
      }
    );
  },
});

export const { clearError, clearSuccess } = categoriesSlice.actions
export default categoriesSlice.reducer;
