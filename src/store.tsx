import { configureStore } from "@reduxjs/toolkit";
import bankReducer from './features/bank/bankSlice'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        bank: bankReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch