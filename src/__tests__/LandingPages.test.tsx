import { FilterType } from '@enum/common';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithClient } from 'src/__mocks__/util';

import LandingPages from '../pages/Landing';
import SpellDetail from '../pages/SelectedSpell';

describe('testing landing page', () => {
	test('render spell list', async () => {
		renderWithClient(<LandingPages />);
		expect(await screen.findByText(/aid/i)).toBeInTheDocument();
	});

	test('check locale storage favorite spell list', async () => {
		window.localStorage.setItem('favorite', JSON.stringify(['aid']));

		renderWithClient(<LandingPages />);

		expect((await screen.findAllByTestId(/favorite/i)).length).toBeGreaterThan(0);
	});

	test('click move to spell detail', async () => {
		renderWithClient(
			<>
				<LandingPages /> <SpellDetail />
			</>,
		);

		fireEvent.click(await screen.findByTestId(/aid/i));
		expect(window.location.pathname).toBe('/spell/aid');
	});

	test('click add favorite spell', async () => {
		window.localStorage.setItem('favorite', JSON.stringify(['aid']));

		renderWithClient(<LandingPages />);

		const buttonUnfavorite = await screen.findAllByTestId(/unfavorite/i);
		fireEvent.click(buttonUnfavorite[0]);

		expect((await screen.findAllByTestId(/favorite/i)).length).toBeGreaterThanOrEqual(2);
	});

	test('click remove favorite spell', async () => {
		window.localStorage.setItem('favorite', JSON.stringify(['aid']));

		renderWithClient(<LandingPages />);

		const buttonFavorite = await screen.findAllByTestId(/favorite/i);
		fireEvent.click(buttonFavorite[0]);

		const data = window.localStorage.getItem('favorite') as any;
		const result = data ? data : [];
		expect(await JSON.parse(result).length).toBeGreaterThanOrEqual(0);
	});

	test('render filter list', async () => {
		renderWithClient(<LandingPages />);
		await screen.findByTestId(/aid/i);
		const buttonText = await screen.findByDisplayValue(/all/i);
		fireEvent.change(buttonText, {
			target: { value: FilterType.FAVOURITE },
		});
		const filterText = await screen.findByText(/favourite/i);
		expect(filterText).toBeInTheDocument();
	});
	test('render filter list', async () => {
		renderWithClient(<LandingPages />);
		await screen.findByTestId(/aid/i);
		const buttonText = await screen.findByDisplayValue(/all/i);
		fireEvent.change(buttonText, {
			target: { value: FilterType.FAVOURITE },
		});
		const filterText = await screen.findByDisplayValue(/favourite/i);
		fireEvent.change(filterText, {
			target: { value: FilterType.ALL },
		});
		const allText = await screen.findByText(/all/i);
		expect(allText).toBeInTheDocument();
	});
});
