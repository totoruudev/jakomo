//src/api/chatApi.jsx
import axios from 'axios';

export const sendMessage = (data) => {
    return axios.post("http://localhost:8084/api/chatbot", data);
}