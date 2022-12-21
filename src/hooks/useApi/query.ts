import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { objectToQueryString } from '@shared/utils/url';
import { callAPI } from '@shared/apis/axiosClient';
import { ApiMethods } from '@shared/enums/api';

const useClientQuery = (url: string, options = {}, key?: string, settings?: {}) => {
	const makeRequest = useCallback(
		() =>
			new Promise<any>((resolve: any, reject: any) => {
				callAPI(ApiMethods.get, url, options).then(
					(data: any) => {
						resolve(data);
					},
					(error: any) => {
						reject(error);
					},
				);
			}),
		[url],
	);
	return useQuery([key || `${url}?${objectToQueryString(options)}`], () => makeRequest(), settings);
};

export default useClientQuery;
