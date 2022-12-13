import axios from 'axios'

//INTERFACES
import User from '../../interfaces/User'

interface UserCredentials {
    email: string,
    password: string
}

const API_URL = '/auth/'

//Login user
const login = async(userCredentials: UserCredentials) => {
    const response = await axios.post(API_URL + 'login', userCredentials)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Register user
const register = async(userData: User) => {
    const response = await axios.post(API_URL + 'signup', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const updateUser = () => {
    const userString = localStorage.getItem('user');
    const user:User | null  = userString !== null ? JSON.parse(userString) : null;

    return user;
}

//Logout
const logout = () => { localStorage.removeItem('user') }

const authService = {
    login,
    register,
    updateUser,
    logout
}

export default authService;