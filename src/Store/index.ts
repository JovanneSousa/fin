import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth'
import categoriesReducer from './reducers/categories'
import transactionsReducer from './reducers/transactions'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        categories: categoriesReducer
        ,transactions: transactionsReducer
    },
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch