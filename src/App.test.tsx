import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders spells list', async () => {
	render(<App />, { wrapper: BrowserRouter });
	const spellElement = await screen.getByTestId(/nprogress/i);
	expect(spellElement).toBeInTheDocument();
});
