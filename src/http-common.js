import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/apu/v1/',
    headers: {
        "content-type": "Application/json"
    }
});
