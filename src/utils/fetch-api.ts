import merge from 'lodash/merge';
import queryString from 'query-string';

import CONSTANTS from '../constants/urls';
import AuthStorage from './auth-storage';
import handleFetchError from './handleFetchError';
import handleFormData from './handleFormData';

type Property = {
	url: string;
	options?: object;
	payload?: any;
};

const { API_URL }: { API_URL: any } = CONSTANTS;

const getURI = (api_url: string, url: string, opts: any, payload: any) => {
	let uri = api_url + url;

	if (opts && opts.method === 'GET') {
		uri = queryString.stringifyUrl({ url: uri, query: payload });
	}

	return uri;
};

const getPayload = (opts: any, payload: any) => {
	if (payload && Object.keys(payload).length > 0) {
		if (opts && opts.method === 'GET') {
			if (payload.filter) {
				payload.filter = JSON.stringify(payload.filter);
			}
		} else {
			handleFormData(opts, payload);
		}
	}
};

const fetchApi = async (
	{ url, options, payload = {} /* , dispatch = f => f */ }: Property,
	cb?: (...f: any) => void,
	api_url = API_URL,
) => {
	try {
		const defaultOptions = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};

		const opts: any = merge(defaultOptions, options);

		// set token
		if (await AuthStorage.value) {
			opts.headers.Authorization = `Bearer ${AuthStorage.value}`;
		}

		const uri = getURI(api_url, url, opts, payload);
		getPayload(opts, payload);

		const response = await fetch(uri, opts);

		if (response.ok && (response.status === 204 || response.statusText === 'No Content')) {
			if (cb) cb(null);
			return {};
		}

		const data = (await response.json()) || {};

		if (response.status !== 200) {
			throw data;
		}

		if (cb) cb(null, data);
		return data;
	} catch (err: any) {
		handleFetchError(err, cb);
	}
};

export default fetchApi;
