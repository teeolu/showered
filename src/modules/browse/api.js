import { URL } from "../auth/api";

export const getAllBrowseServiceDetailsApi = query => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/browse?query=${JSON.stringify(query)}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				let result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result = { ...result, ...json };
							return result;
						} catch (error) {
							return result;
						}
					} else {
						return result;
					}
				} else {
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					payload: error
				});
			});
	});
};
