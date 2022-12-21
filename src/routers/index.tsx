import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
	(
		<Suspense fallback={<SuspenseLoader />}>
			<Component {...props} />
		</Suspense>
	);

// Pages

// const Overview = Loader(lazy(() => import('./content/overview')));

// Dashboards

const LandingPages = Loader(lazy(() => import('../pages/Landing')));
const SelectedSpellPages = Loader(lazy(() => import('../pages/SelectedSpell')));

// Applications

// Status

const routes: RouteObject[] = [
	{
		path: '/',
		element: <LandingPages />,
	},
	{ path: '*', element: <Navigate to="/" replace /> },
	{
		path: '/spell/:index',
		element: <SelectedSpellPages />,
	},
];

export default routes;
