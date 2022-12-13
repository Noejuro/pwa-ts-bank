import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { AxiosError } from 'axios'

//INTERFACES
import User from '../../interfaces/User'

interface InitalState {
    user: User | null,
    isError: boolean,
    message: string | unknown
}

interface UserCredentials {
    email: string,
    password: string
}

interface KnownError {
    message: string
}

const userJson = localStorage.getItem('user');
const user:User | null  = userJson !== null ? JSON.parse(userJson) : null;

const initialState: InitalState = {
    user,
    isError: false,
    message: ''
}

//Login user
export const login = createAsyncThunk(
    'auth/login', 
    async (userCredentials: UserCredentials, thunkAPI) => {
        try {
            return await authService.login(userCredentials);
        } catch (error) {
            const err = error as AxiosError<KnownError>
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
})

//Register user
export const registerUser = createAsyncThunk(
    'auth/register', 
    async (user: User, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const err = error as AxiosError<KnownError>
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
})

//Update user
export const updateUser = createAsyncThunk(
    'auth/updateUser', 
    async () => {
        return await authService.updateUser();
})

//Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout();
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = '';
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isError = false;
                state.message = '';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.message = '';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.user = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer;