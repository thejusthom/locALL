import axios from 'axios';
import { toast } from "react-toastify";

const getWeather = (url: string) => {
        const response = axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    return response.data;
                } else {
                    toast.error('Weather data not found');
                }
            })
            .catch(error => toast.error(error.message));
            return response;
};

const weatherService = { getWeather };
export default weatherService;