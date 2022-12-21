export const removeEmptyParams = (queries: any) => {
	if (queries) {
		for (const key of Object.keys(queries)) {
			if (queries[key] === '' || queries[key] === undefined) {
				delete queries[key];
			}
		}
	}
	return queries;
};
