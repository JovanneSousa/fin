import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
}

const initialState: CategoriesState = {
  receita: [] as Category[],
  despesa: [] as Category[],
  loading: false,
  error: null as string | null,
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
  { name: string; type: number }
>(
  "categories/post",
  async ({ name, type }, { getState }) => {
    const state = getState() as RootReducer;
    const token = state.auth.token || localStorage.getItem("token");

    const response = await api.post<Category>(
      "api/categories",
      { name, type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
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
  },
});

export default categoriesSlice.reducer;
