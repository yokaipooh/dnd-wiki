import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton, styled, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite, HelpOutlineOutlined } from '@mui/icons-material';
import { SpellCommonProps } from '@interfaces/common';
import { AppContext } from '@contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const CustomizeCard = styled(Card)(({ theme }) => ({
	width: '100%',
	backgroundColor: '#242F39',
	color: '#ffffff',
	padding: theme.spacing(0),
	alignSelf: 'center',
}));

const CustomizeCardContent = styled(CardContent)(({ theme }) => ({
	padding: theme.spacing(2),
	':last-child': {
		paddingBottom: theme.spacing(2),
	},
}));

const CommonCard: React.FC<SpellCommonProps> = (props) => {
	const { name, url, index } = props;
	const navigate = useNavigate();
	const { favorite, handleFavorite } = React.useContext(AppContext);

	const isFavorite = React.useMemo(() => {
		return favorite.indexOf(index);
	}, [favorite]);

	const handleFavoriteItem = () => {
		let newArray = favorite;
		if (isFavorite !== -1) {
			newArray.splice(isFavorite, 1);
		} else {
			newArray.push(`${index}`);
		}

		handleFavorite(newArray);
	};

	const handleSeeMoreInfo = () => {
		navigate(`/spell/${index}`);
	};

	return (
		<Grid item xs={12} sm={6} md={3} display={'flex'} justifyContent={'center'}>
			<CustomizeCard>
				<CustomizeCardContent sx={{}}>
					<Grid container>
						{/*  */}
						<Grid item xs={8} alignSelf={'center'}>
							<Typography gutterBottom variant="h5" component="div" mb={0}>
								{name}
							</Typography>
						</Grid>
						<Grid item xs={4} alignSelf="center">
							<Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
								<Tooltip
									title={isFavorite !== -1 ? 'Remove Favorite' : 'Add Favorite'}
									leaveDelay={0}
								>
									<IconButton
										sx={{
											color: '#ED4956',
										}}
										onClick={handleFavoriteItem}
									>
										{isFavorite !== -1 ? (
											<Favorite data-testid="favorite" />
										) : (
											<FavoriteBorder data-testid="unfavorite" />
										)}
									</IconButton>
								</Tooltip>

								<Tooltip title="More Info" data-testid={index} leaveDelay={0}>
									<IconButton
										sx={{
											color: '#ffffff',
										}}
										onClick={handleSeeMoreInfo}
									>
										<HelpOutlineOutlined fontSize="small" />
									</IconButton>
								</Tooltip>
							</Box>
						</Grid>
					</Grid>
				</CustomizeCardContent>
			</CustomizeCard>
		</Grid>
	);
};

export default CommonCard;
