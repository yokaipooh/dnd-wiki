import { useRoutes } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import router from '../src/routers';
import { AppProvider } from './contexts/AppContext';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

const App = () => {
	const content = useRoutes(router);

	return (
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				{/* {content} */}
				<LocalizationProvider dateAdapter={AdapterDateFns}>{content}</LocalizationProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</AppProvider>
	);
};
export default App;
