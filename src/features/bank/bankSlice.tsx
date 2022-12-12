import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bankService from './bankService';
import { AxiosError } from 'axios'

interface IInitalState {
    access: string,
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
    async (body: {link: string, institution: string}, thunkAPI) => {
        try {
            return await bankService.associateBank(body);
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
    },
})

export const { reset, resetAssociate } = bankSlice.actions
export default bankSlice.reducer;