import React from 'react';
import { AppContext } from '@contexts/AppContext';
import useApi from '@hooks/useApi';
import CommonCard from '@components/CommonCardItem';
import { SpellCommonProps } from '@interfaces/common';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import CustomizeCard from '@components/CommonContainer';
import CommonLoading from '@components/CommonLoading';
import { FilterType } from '@enum/common';

function LandingPages() {
	const { favorite, handleFavorite } = React.useContext(AppContext);
	const [spellListData, setSpellListData] = React.useState<SpellCommonProps[]>([]);
	const [filter, setFilter] = React.useState<FilterType>(FilterType.ALL);
	const [loading, setLoading] = React.useState<boolean>(false);

	const { data, isSuccess } = useApi.get('/api/spells', {}, '', {
		refetchOnWindowFocus: false,
		keepPreviousData: true,
	});

	const spellList = React.useMemo(() => {
		setLoading(false);
		if (!spellListData) return [];
		if (filter === FilterType.FAVOURITE) {
			const filterData = spellListData.filter(
				(val: SpellCommonProps) => favorite.indexOf(val.index) !== -1,
			);
			return filterData || [];
		}
		return spellListData;
	}, [spellListData, favorite, filter]);

	React.useEffect(() => {
		const favorite = localStorage.getItem('favorite') || '';
		if (!favorite) return;
		if (!JSON.parse(favorite)) return;
		handleFavorite(JSON.parse(favorite));
	}, []);

	React.useEffect(() => {
		if (!data) return;
		setSpellListData(data.results);
	}, [isSuccess]);

	const handleFilter = (value: string) => {
		setLoading(true);
		switch (value) {
			case FilterType.ALL: {
				setFilter(FilterType.ALL);
				return;
			}
			case FilterType.FAVOURITE: {
				setFilter(FilterType.FAVOURITE);
				return;
			}
			default:
				return;
		}
	};

	return (
		<>
			{isSuccess && spellList ? (
				<>
					<CustomizeCard>
						<Select
							value={filter}
							onChange={(e) => handleFilter(e.target.value)}
							sx={{
								float: 'right',
								color: '#ffffff',
								mb: 3,
								'.MuiOutlinedInput-notchedOutline': { border: 0 },
								'.MuiSelect-icon': {
									color: '#ffffff',
								},
							}}
							data-testid="filter"
						>
							<MenuItem value={FilterType.ALL} data-testid="all">
								All
							</MenuItem>
							<MenuItem value={FilterType.FAVOURITE} data-testid="favourite">
								Favourite
							</MenuItem>
						</Select>
						{filter === FilterType.FAVOURITE && spellList.length === 0 && (
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography color="#ffffff" display={'flex'} justifyContent={'center'}>
										No data
									</Typography>
								</Grid>
							</Grid>
						)}
						<Grid container spacing={2}>
							{spellList &&
								spellList.map((spell: SpellCommonProps, index: number) => {
									return (
										<CommonCard
											key={`${index} - ${spell.name}`}
											name={spell.name}
											url={spell.url}
											index={spell.index}
										/>
									);
								})}
						</Grid>
					</CustomizeCard>
					<CommonLoading
						open={(!(spellList.length > 0) && filter !== FilterType.FAVOURITE) || loading}
					/>
				</>
			) : (
				<>
					<CommonLoading open={true} />
				</>
			)}
		</>
	);
}

export default LandingPages;
