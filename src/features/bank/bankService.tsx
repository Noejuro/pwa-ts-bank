import axios from 'axios'
import getConfig from '../../utils/axiosConfig'

const API_URL = '/bank/'

//Get access token
const getAccessToken = async() => {
    const config = getConfig();
    const response = await axios.get(API_URL + 'access_token', config)

    return response.data
}

// Associate Bank
const associateBank = async(body: {link: string, institution: string}) => {
    const config = getConfig();
    const response = await axios.put(API_URL + 'associate_belvo', body, config)

    return response.data
}

const bankService = {
    getAccessToken,
    associateBank
}

export default bankService;