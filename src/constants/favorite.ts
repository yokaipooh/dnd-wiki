export default {
	get: () => {
		return localStorage.getItem('favorite') || [];
	},
	set: (data: string[]) => {
		return localStorage.setItem('favorite', JSON.stringify(data));
	},
	remove: () => {
		return localStorage.removeItem('favorite');
	},
};
