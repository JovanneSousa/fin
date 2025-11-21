import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth'
import categoriesReducer from './reducers/categories'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        categories: categoriesReducer
    },
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch