const handleFormData = (opts: any, payload: any) => {
	if (opts.headers['Content-Type'] === 'multipart/form-data') {
		delete opts.headers['Content-Type'];

		const formData = new FormData();
		Object.entries(payload).forEach(([key, val]: any) => {
			if (val) {
				if (
					key === 'assetFiles' ||
					key === 'pdfFiles' ||
					key === 'images' ||
					key === 'newImages' ||
					key === 'newPdfFiles' ||
					key === 'newMediaFiles' ||
					key === 'deleteImages' ||
					key === 'deletePdfFiles' ||
					key === 'deleteMediaFiles'
				) {
					val.forEach((file: any) => {
						formData.append(key, file);
					});
				} else {
					formData.append(key, val);
				}
			}
		});

		opts.body = formData;
	} else {
		opts.body = JSON.stringify(payload);
	}
};

export default handleFormData;
