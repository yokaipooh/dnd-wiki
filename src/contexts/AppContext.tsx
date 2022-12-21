import { useState, createContext } from 'react';

export type AppProviderType = {
	favorite: string[];
	handleFavorite: (data: string[]) => void;
};

export const AppContext = createContext<AppProviderType>({} as AppProviderType);

export const AppProvider = (props: any) => {
	const [favorite, setFavorite] = useState<string[]>([]);

	const handleFavorite = (data: string[]) => {
		setFavorite([...data]);
		localStorage.setItem('favorite', JSON.stringify(data));
	};

	return (
		<AppContext.Provider
			value={{
				favorite,
				handleFavorite,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
