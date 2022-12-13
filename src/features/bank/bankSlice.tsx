import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bankService from './bankService';
import { AxiosError } from 'axios'
import { AssociateBankProps, GetTransactionsProps } from '../../interfaces/Bank';

interface IInitalState {
    access: string,
    transactions: {amount: number}[],
    isTransactions: boolean,
    isTransactionsError: boolean,
    isError: boolean,
    isRequested: boolean,
    isAssociated: boolean,
    isAssociatedError: boolean,
    message: string | unknown
}

interface KnownError {
    message: string
}

const initialState: IInitalState = {
    access: '',
    transactions: [],
    isTransactions: false,
    isTransactionsError: false,
    isError: false,
    isRequested: false,
    isAssociated: false,
    isAssociatedError: false,
    message: ''
}

//Get all products
export const getAccessToken = createAsyncThunk(
    'bank/access_token', 
    async (_, thunkAPI) => {
        try {
            return await bankService.getAccessToken();
        } catch (error) {
            const err = error as AxiosError<KnownError>
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
})

//Create product
export const associateBank = createAsyncThunk(
    'bank/associate_belvo', 
    async (body: AssociateBankProps, thunkAPI) => {
        try {
            return await bankService.associateBank(body);
        } catch (error) {
            const err = error as AxiosError<KnownError>
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
})

//Get transactions

export const getTransactions = createAsyncThunk(
    'bank/transactions', 
    async (body: GetTransactionsProps, thunkAPI) => {
        try {
            return await bankService.getTransactions(body);
        } catch (error) {
            const err = error as AxiosError<KnownError>
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
})

export const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = '';
            state.access = '';
            state.isRequested = false;
        },
        resetAssociate: (state) => {
            state.isAssociatedError = false;
            state.message = '';
            state.isAssociated = false;
        },
        resetTransactions: (state) => {
            state.isTransactionsError = false;
            state.message = '';
            state.isTransactions = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccessToken.fulfilled, (state, action) => {
                state.isRequested = true;
                state.isError = false;
                state.message = '';
                state.access = action.payload.access;
            })
            .addCase(getAccessToken.rejected, (state, action) => {
                state.isRequested = true;
                state.isError = true;
                state.message = action.payload;
                state.access = '';
            })

            .addCase(associateBank.fulfilled, (state, action) => {
                state.isAssociatedError = false;
                state.isAssociated = true;
                state.message = '';
            })
            .addCase(associateBank.rejected, (state, action) => {
                state.isAssociatedError = true;
                state.isAssociated = false;
                state.message = action.payload;
            })

            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isTransactions = true;
                state.isTransactionsError = false;
                state.message = '';
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isTransactions = false;
                state.isTransactionsError = true;
                state.message = action.payload;
                state.transactions = [];
            })
    },
})

export const { reset, resetAssociate, resetTransactions } = bankSlice.actions
export default bankSlice.reducer;