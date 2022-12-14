import axios from 'axios'
import { AssociateBankProps, GetTransactionsProps } from '../../interfaces/Bank';
import getConfig from '../../utils/axiosConfig'

const API_URL = '/bank/'

//Get access token
const getAccessToken = async() => {
    const config = getConfig();
    const response = await axios.get(`${API_URL}access_token`, config)

    return response.data
}

// Associate Bank
const associateBank = async(body : AssociateBankProps) => {
    const config = getConfig();
    const response = await axios.put(`${API_URL}associate_belvo`, body, config)

    const userString = localStorage.getItem('user');
    let user = userString !== null ? JSON.parse(userString) : null;
    const { link, institution } = body; 
    localStorage.setItem('user', JSON.stringify({...user, link, institution}));

    return response.data
}

// Get Transactions List

const getTransactions = async ({link, page} : GetTransactionsProps) => {
    const config = getConfig();
    const response = await axios.get(`${API_URL}transactions?page=${page}&link=${link}`, config)

    return response.data
}

const bankService = {
    getAccessToken,
    associateBank,
    getTransactions
}

export default bankService;