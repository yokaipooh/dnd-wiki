import { AppProvider } from '@contexts/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export const handlers = [
	rest.get('https://www.dnd5eapi.co/api/spells', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				count: 4,
				results: [
					{ index: 'acid-arrow', name: 'Acid Arrow', url: '/api/spells/acid-arrow' },

					{ index: 'acid-splash', name: 'Acid Splash', url: '/api/spells/acid-splash' },

					{ index: 'aid', name: 'Aid', url: '/api/spells/aid' },

					{ index: 'alarm', name: 'Alarm', url: '/api/spells/alarm' },
				],
			}),
		);
	}),
	rest.get('https://www.dnd5eapi.co/api/spells/*', (req, res, ctx) => {
		const index = req.url;
		console.log('userId', index.pathname);
		return res(
			ctx.status(200),
			ctx.json({
				index: 'aid',
				name: 'Aid',
				desc: [
					"Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration.",
				],
				higher_level: [
					"When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above 2nd.",
				],
				range: '30 feet',
				components: ['V', 'S', 'M'],
				material: 'A tiny strip of white cloth.',
				ritual: false,
				duration: '8 hours',
				concentration: false,
				casting_time: '1 action',
				level: 2,
				heal_at_slot_level: {
					'2': '5',
					'3': '10',
					'4': '15',
					'5': '20',
					'6': '25',
					'7': '30',
					'8': '35',
					'9': '40',
				},
				school: {
					index: 'abjuration',
					name: 'Abjuration',
					url: '/api/magic-schools/abjuration',
				},
				classes: [
					{
						index: 'cleric',
						name: 'Cleric',
						url: '/api/classes/cleric',
					},
					{
						index: 'paladin',
						name: 'Paladin',
						url: '/api/classes/paladin',
					},
				],
				subclasses: [
					{
						index: 'lore',
						name: 'Lore',
						url: '/api/subclasses/lore',
					},
				],
				url: '/api/spells/aid',
				damage: {
					damage_type: {
						index: 'acid',
						name: 'Acid',
						url: '/api/damage-types/acid',
					},
					damage_at_character_level: {
						1: '1d6',
						5: '2d6',
						11: '3d6',
						17: '4d6',
					},
					damage_at_slot_level: {
						1: '1d6',
						5: '2d6',
						11: '3d6',
						17: '4d6',
					},
				},
			}),
		);
	}),
];

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

export function renderWithClient(ui: React.ReactNode) {
	const testQueryClient = createTestQueryClient();
	const { rerender, ...result } = render(
		<AppProvider>
			<QueryClientProvider client={testQueryClient}>
				<Router>{ui}</Router>
			</QueryClientProvider>
		</AppProvider>,
	);
	return {
		...result,
		rerender: (rerenderUi: React.ReactNode) =>
			rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
	};
}

export function createWrapper() {
	const testQueryClient = createTestQueryClient();
	return (children: React.ReactNode) => (
		<AppProvider>
			<QueryClientProvider client={testQueryClient}>
				<Router>{children}</Router>
			</QueryClientProvider>
		</AppProvider>
	);
}
