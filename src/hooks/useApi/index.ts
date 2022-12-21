/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/rules-of-hooks */
import useClientQuery from './query';

export default {
	get: (url: string, options = {}, key?: string, settings?: {}) =>
		useClientQuery(url, options, key, settings),
};
