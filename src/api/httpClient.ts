import axios from 'axios';

export const httpClient = axios.create({baseURL: 'http://localhost:4043/api/v1'});
