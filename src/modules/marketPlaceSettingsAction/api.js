import { URL } from "../auth/api";

// Amins api
export const disableMarketplaceAdminApi = (adminId, marketPlaceId) => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/marketplace_settings/disable_admin?adminId=${adminId}&marketPlaceId=${marketPlaceId}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

export const removeMarketplaceAdminApi = (adminId, marketPlaceId) => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/marketplace_settings/remove_admin?adminId=${adminId}&marketPlaceId=${marketPlaceId}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

export const removePendingMarketplaceAdminApi = (userId, marketPlaceId) => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/marketplace_settings/remove_pending_admin?userId=${userId}&marketPlaceId=${marketPlaceId}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

export const addMarketplaceAdminApi = data => {
	const payload = {
		...data
	};
	const init = {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin",
		body: JSON.stringify(payload)
	};
	const endpoint = `${URL}/api/marketplace_settings/add_admin`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

// staff api
export const disableMarketplaceStaffApi = (staffId, marketPlaceId) => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/marketplace_settings/disable_staff?staffId=${staffId}&marketPlaceId=${marketPlaceId}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

export const removeMarketplaceStaffApi = (staffId, marketPlaceId) => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/marketplace_settings/remove_staff?staffId=${staffId}&marketPlaceId=${marketPlaceId}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

export const addMarketplaceStaffApi = data => {
	const payload = {
		...data
	};
	const init = {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin",
		body: JSON.stringify(payload)
	};
	const endpoint = `${URL}/api/marketplace_settings/add_staff`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};

export const removePendingMarketplaceStaffApi = (userId, marketPlaceId) => {
	const init = {
		method: "GET",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		credentials: "same-origin"
	};
	const endpoint = `${URL}/api/marketplace_settings/remove_pending_staff?userId=${userId}&marketPlaceId=${marketPlaceId}`;
	return new Promise((resolve, reject) => {
		fetch(endpoint, init)
			.then(async response => {
				const result = {
					success: response.ok,
					status: response.status
				};
				const contentLength = response.headers.get("Content-Length");
				if (contentLength && contentLength > 0) {
					const contentType = response.headers.get("Content-Type");
					if (contentType && contentType.startsWith("application/json")) {
						try {
							const json = await response.json();
							result["payload"] = json;
							return result;
						} catch (error) {
							result["payload"] = {};
							return result;
						}
					} else {
						result["payload"] = {};
						return result;
					}
				} else {
					result["payload"] = {};
					return result;
				}
			})
			.then(result => resolve(result))
			.catch(error => {
				resolve({
					success: false,
					status: 0,
					statusText: "",
					payload: error
				});
			});
	});
};
