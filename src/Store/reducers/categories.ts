import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../Services/api";
import axios from "axios";
import type { ResponsePayload } from "./transactions";
import type { IconType } from "../../components/Icone";
import type { CategoriaFormData } from "../../validations/categoriaSchema";
import { logarUsuario, logout } from "./auth";

export interface ErrorResponse {
  success: boolean;
  errors: string[];
}

export interface Icone {
  id: string;
  name: string;
  url: IconType;
}

export interface Cor {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  type: number;
  cor: Cor;
  icone: Icone;
}

interface CategoriesState {
  items: {
    receita: Category[];
    despesa: Category[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };

  itemById: {
    item: Category | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };

  icone: {
    item: Icone[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };

  cores: {
    item: Cor[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };

  loadingPost: boolean;
  errorPost: string | null;
  successPost: string | null;

  loadingDelete: boolean;
  errorDelete: string | null;
  successDelete: string | null;

  update: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    success: string | null;
  };
}

export const initialState: CategoriesState = {
  items: {
    receita: [] as Category[],
    despesa: [] as Category[],
    status: "idle",
    error: null,
  },
  icone: {
    item: [],
    status: "idle",
    error: null,
  },

  cores: {
    item: [],
    status: "idle",
    error: null,
  },

  itemById: {
    item: null,
    status: "idle",
    error: null,
  },

  loadingPost: false,
  errorPost: null as string | null,
  successPost: null as string | null,

  loadingDelete: false,
  errorDelete: null as string | null,
  successDelete: null as string | null,

  update: {
    status: "idle",
    error: null,
    success: null,
  },
};

export const getIcones = createAsyncThunk<
  ResponsePayload<Icone[]>,
  void,
  { rejectValue: string }
>("icones/fetch", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get<ResponsePayload<Icone[]>>(
      "api/categories/icones",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const erro = err.response?.data.errors;
      if (erro) return rejectWithValue(erro[0]);
    }
    return rejectWithValue("Houve um erro ao buscar os icones");
  }
});

export const updateCategoria = createAsyncThunk<
  ResponsePayload<Category>,
  { categoria: CategoriaFormData; id: string },
  { rejectValue: string }
>("updateCategories", async ({ categoria, id }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.put<ResponsePayload<Category>>(
      `api/categories/atualizar/${id}`,
      categoria,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const erro = err.response?.data.errors;
      if (erro) return rejectWithValue(erro[0]);
    }
    return rejectWithValue("Falha ao atualizar categoria");
  }
});

export const getCores = createAsyncThunk<
  ResponsePayload<Cor[]>,
  void,
  { rejectValue: string }
>("cores/fetch", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get<ResponsePayload<Cor[]>>(
      "api/categories/cores",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const erro = err.response?.data.errors;
      if (erro) return rejectWithValue(erro[0]);
    }
    return rejectWithValue("Houve um erro ao buscar as cores");
  }
});

export const getCategories = createAsyncThunk<
  ResponsePayload<Category[]>,
  void,
  { rejectValue: string }
>("categories/fetch", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get<ResponsePayload<Category[]>>(
      "api/categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const erro = err.response?.data.errors;
      if (erro) return rejectWithValue(erro[0]);
    }
    return rejectWithValue("Houve um erro ao buscar as categorias!");
  }
});

export const getCategorieById = createAsyncThunk<
  ResponsePayload<Category>,
  string,
  { rejectValue: string }
>("categoriesById/fetch", async (id, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get<ResponsePayload<Category>>(
      `api/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      const erro = err.response?.data.errors;
      if (erro) return rejectWithValue(erro[0]);
    }
    return rejectWithValue("Houve um erro ao buscar a categoria!");
  }
});

export const postCategories = createAsyncThunk<
  ResponsePayload<Category>,
  CategoriaFormData,
  { rejectValue: string }
>("categories/post", async (categoria, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post<ResponsePayload<Category>>(
      "api/categories",
      categoria,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
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

    await api.delete<ResponsePayload<string>>(`api/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
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
      state.items.status = "idle";
      state.items.error = null;

      state.icone.status = "idle";
      state.icone.error = null;

      state.cores.status = "idle";
      state.cores.error = null;

      state.itemById.status = "idle";
      state.itemById.error = null;

      state.errorPost = null;
      state.loadingPost = false;

      state.errorDelete = null;
      state.loadingDelete = false;

      state.update.status = "idle";
      state.update.error = null;
    },
    clearSuccess(state) {
      state.items.status = "idle";
      state.icone.status = "idle";

      state.cores.status = "idle";

      state.itemById.status = "idle";
      state.successDelete = null;
      state.successPost = null;

      state.update.status = "idle";
      state.update.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, () => initialState)
      .addCase(logarUsuario.fulfilled, () => initialState)
      .addCase(getCategories.pending, (state) => {
        state.items.status = "loading";
        state.items.error = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ResponsePayload<Category[]>>) => {
          state.items.receita = action.payload.data.filter((c) => c.type === 1);
          state.items.despesa = action.payload.data.filter((c) => c.type === 0);
          state.items.status = "succeeded";
        },
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.items.error = action.payload || "Erro ao carregar categorias";
        state.items.status = "failed";
      })

      .addCase(postCategories.pending, (state) => {
        state.loadingPost = true;
        state.errorPost = null;
      })
      .addCase(
        postCategories.fulfilled,
        (state, action: PayloadAction<ResponsePayload<Category>>) => {
          state.loadingPost = false;

          const categoria = action.payload.data;
          if (!categoria) return;

          const isReceita = categoria.type === 1;
          (isReceita ? state.items.receita : state.items.despesa).push(
            categoria,
          );
          state.successPost = "Categoria adicionada com sucesso!";
        },
      )
      .addCase(postCategories.rejected, (state, action) => {
        state.loadingPost = false;
        state.errorPost = action.payload || "Erro ao adicionar categoria";
      })

      .addCase(deleteCategories.pending, (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorDelete =
          (action.payload as string) || "Erro ao deletar essa categoria";
      })
      .addCase(
        deleteCategories.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loadingDelete = false;
          state.items.receita = state.items.receita.filter(
            (c) => c.id !== action.payload,
          );
          state.items.despesa = state.items.despesa.filter(
            (c) => c.id !== action.payload,
          );
          state.successDelete =
            state.successDelete || "Categoria deletada com sucesso";
        },
      )

      .addCase(getIcones.pending, (state) => {
        state.icone.error = null;
        state.icone.status = "loading";
      })
      .addCase(getIcones.rejected, (state, action) => {
        state.icone.error = action.payload || "Erro ao buscar icones";
        state.icone.status = "failed";
      })
      .addCase(getIcones.fulfilled, (state, action) => {
        state.icone.item = action.payload.data;
        state.icone.status = "succeeded";
        state.icone.error = null;
      })

      .addCase(getCores.pending, (state) => {
        state.cores.error = null;
        state.cores.status = "loading";
      })
      .addCase(getCores.rejected, (state, action) => {
        state.cores.error = action.payload || "Erro ao buscar cores";
        state.cores.status = "failed";
      })
      .addCase(getCores.fulfilled, (state, action) => {
        state.cores.item = action.payload.data;
        state.cores.status = "succeeded";
        state.cores.error = null;
      })

      .addCase(getCategorieById.pending, (state) => {
        state.itemById.status = "loading";
        state.itemById.error = null;
      })
      .addCase(getCategorieById.rejected, (state, action) => {
        state.itemById.error = action.payload || "Erro ao buscar categoria";
        state.itemById.status = "failed";
      })
      .addCase(getCategorieById.fulfilled, (state, action) => {
        state.itemById.status = "succeeded";
        state.itemById.item = action.payload.data;
        state.itemById.error = null;
      })

      .addCase(updateCategoria.pending, (state) => {
        state.update.status = "loading";
        state.update.error = null;
        state.update.success = null;
      })
      .addCase(updateCategoria.rejected, (state, action) => {
        state.update.status = "failed";
        state.update.error = action.payload || "Erro ao atualizar categoria";
        state.update.success = null;
      })
      .addCase(updateCategoria.fulfilled, (state) => {
        state.update.status = "succeeded";
        state.update.error = null;
        state.update.success = "Categoria atualizada com sucesso";
      });
  },
});

export const { clearError, clearSuccess } = categoriesSlice.actions;
export default categoriesSlice.reducer;
