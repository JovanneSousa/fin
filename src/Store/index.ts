import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth'
import categoriesReducer from './reducers/categories'
import transactionsReducer from './reducers/transactions'
import { authMiddleware } from "./middleware/authMiddleware";

export const store = configureStore({
    reducer: {
        auth : authReducer,
        categories: categoriesReducer
        ,transactions: transactionsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch