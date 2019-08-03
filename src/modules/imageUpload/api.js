import { URL } from "../auth/api";

export const imageUploadApi = async formData => {
	const config = {
		method: 'POST',
		header: {
			"Content-Type": `multipart/form-data`,
			'Accept': 'application/json'
		},
		credentials: 'same-origin',
		body: formData
	}

	return new Promise((resolve, reject) => {
		fetch(`${URL}/api/imageUpload`, config)
			.then(async (response) => {
				const result = {
					success: response.ok,
					status: response.status,
					statusText: response.statusText
				};
				const contentLength = response.headers.get('Content-Length');
				const contentType = response.headers.get('Content-Type');
				if ((contentLength && contentLength > 0) || (contentType && contentType.startsWith('application/json'))) {
					if (contentType && contentType.startsWith('application/json')) {
						try {
							const json = await response.json();
							result['payload'] = json;
							return result;
						} catch (error) {
							result['payload'] = {};
							return result;
						}
					} else {
						result['payload'] = {};
						return result;
					}
				} else {
					result['payload'] = {};
					return result;
				}
			})
			.then((result) => {
				console.log("result of image upload ", result)
				resolve(result);
			})
			.catch((error) => {
				resolve({
					success: false,
					status: 0,
					statusText: '',
					payload: error
				});
			});
	});
};