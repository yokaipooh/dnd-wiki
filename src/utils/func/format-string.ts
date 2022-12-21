import { startCase, toLower } from 'lodash';

export const ucwords = (value: string) => startCase(toLower(value));

export const textAddon = (
	value: string,
	addonAfter = '',
	addonBefore = '',
	space = ' ',
	prettier = true,
) => {
	if ((value || value?.length > 0) && value !== '-') {
		return addonBefore + space + (prettier ? ucwords(value) : value) + space + addonAfter;
	} else {
		return '-';
	}
};

export const limitCharacter = (
	value: string,
	index = 0,
	limit = 10,
	ellipsis = true,
	prettier = true,
) => {
	const valueSlice = value?.slice(index, limit);

	if (value || value?.length > 0) {
		return (prettier ? ucwords(valueSlice) : valueSlice) + (ellipsis ? '...' : '');
	} else {
		return '-';
	}
};

export const truncateString = (str: string, num = 10) => {
	if (str?.length > num) {
		return str.slice(0, num) + '...';
	} else {
		return str;
	}
};

export const capitalizeFirstLetter = (string: string) => {
	return string && string.charAt(0).toUpperCase() + string.slice(1);
};
