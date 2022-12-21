import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiMethods } from '@shared/enums/api';

const baseURL = process.env.REACT_APP_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
	headers: {
		Accept: 'applications/json',
		'Content-Type': 'application/json',
	},
	baseURL,
});

axiosInstance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// Do something before request is sent
		return config;
	},
	(error: AxiosError) => {
		// Do something with request error
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response.data;
	},
	(error: AxiosError) => {
		throw error;
	},
);

export const callAPI = (method: ApiMethods, path: string, body: object, config: object = {}) => {
	let res = null;

	switch (method) {
		case 'get':
			// in case GET method: body is config
			res = axiosInstance[method](path, body || config);
			break;
		default:
			res = axiosInstance[method](path, body, config);
	}

	return res
		.then((resp: any) => {
			return resp;
		})
		.catch(async (error: any) => {
			switch (error.response?.status) {
				case 400: // Wrong url or params
					break;
				case 403: // Wrong url or params
					break;
				case 500: // Server error
					break;
				default:
					throw error.response.data;
			}
			throw error.response.data;
		});
};
