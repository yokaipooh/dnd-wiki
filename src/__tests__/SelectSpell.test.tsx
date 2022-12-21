import { createBrowserHistory } from '@remix-run/router';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithClient } from 'src/__mocks__/util';

import SpellDetail from '../pages/SelectedSpell';

describe('testing select spell ', () => {
	let assignMock = jest.fn();

	test('click move to spell detail', async () => {
		const index = 'aid';
		global.window.location = {
			ancestorOrigins: null as any,
			hash: null as any,
			host: 'dummy.com',
			port: '80',
			protocol: 'http:',
			hostname: 'dummy.com',
			href: 'http://dummy.com/spell/aid',
			origin: 'http://dummy.com',
			pathname: 'http://dummy.com/spell/aid',
			search: null as any,
			assign: null as any,
			reload: null as any,
			replace: null as any,
		};
		renderWithClient(
			<>
				<SpellDetail />
			</>,
		);
		expect(await screen.findByText(/A tiny strip of white cloth./i)).toBeInTheDocument();
	});

	test('go back to home page', async () => {
		renderWithClient(
			<>
				<SpellDetail />
			</>,
		);
		await screen.findByText(/Aid/i);
		const iconText = await screen.getByTestId('back-button');
		fireEvent.click(iconText);
		expect(window.location.pathname).toBe('/');
	});
});
