import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import App from '../src/App';
import * as serviceWorker from '../src/serviceWorker';

import 'nprogress/nprogress.css';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<HelmetProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</HelmetProvider>,
);

serviceWorker.unregister();
