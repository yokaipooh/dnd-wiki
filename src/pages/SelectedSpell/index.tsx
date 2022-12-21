import CommonLoading from '@components/CommonLoading';
import { SpellComponentType } from '@enum/common';
import useApi from '@hooks/useApi';
import { DetailSpellProps, SpellCommonProps } from '@interfaces/common';
import { ArrowBackOutlined } from '@mui/icons-material';
import { Box, Chip, Grid, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CustomizeBoxContain = styled(Box)(({ theme }) => ({
	paddingBottom: theme.spacing(1),
	borderBottom: '1px solid rgba(160,182,191,0.4)',
	marginBottom: theme.spacing(1),
	color: 'rgba(160,182,191,0.9)',
}));

const SpellDetail = () => {
	let { index } = useParams();
	const navigate = useNavigate();
	const [selectedSpell, setSelectedSpell] = useState<DetailSpellProps>();

	const renderComponentSpell = (value: SpellComponentType) => {
		switch (value) {
			case SpellComponentType.M:
				return `Material ${selectedSpell?.material && `(${selectedSpell?.material})`}`;
			case SpellComponentType.V:
				return 'Verbal';
			case SpellComponentType.S:
				return 'Somatic';
			default:
				return;
		}
	};

	const renderIsRitual = (value: boolean) => {
		switch (value) {
			case true:
				return 'Ritual not required';
			case false:
				return 'Ritual required';
			default:
				return;
		}
	};

	const renderSchool = (value: SpellCommonProps) => {
		return `School: ${value.name}`;
	};

	const { data, isSuccess } = useApi.get(`/api/spells/${index}`, {}, '', {
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (!index) {
			navigate('/');
		}
		if (!data) return;
		setSelectedSpell(data);
	}, [isSuccess]);

	console.log(selectedSpell);

	return (
		<>
			{isSuccess && selectedSpell ? (
				<Typography component={'div'} p={7} height="100%" sx={{ backgroundColor: '#1C242D' }}>
					<Paper
						elevation={3}
						sx={{
							p: 3,
							background: '#242F39',
						}}
					>
						{selectedSpell && (
							<>
								<CustomizeBoxContain>
									<Box display={'flex'} alignContent={'center'}>
										<IconButton
											onClick={() => navigate('/')}
											sx={{ pr: 2, color: '#ffffff' }}
											data-testid="back-button"
										>
											<ArrowBackOutlined fontSize="large" />
										</IconButton>

										<Typography variant="h3" color="white">
											{selectedSpell.name}
										</Typography>
									</Box>

									<Stack direction="row" py={2} flexWrap="wrap" gap={1}>
										<Chip
											label={renderIsRitual(selectedSpell.ritual)}
											variant="outlined"
											sx={{
												color: 'white',
											}}
										/>
										<Chip
											label={renderSchool(selectedSpell.school)}
											variant="outlined"
											sx={{
												color: 'white',
											}}
										/>
										<Chip
											label={`Level: ${selectedSpell.level}`}
											variant="outlined"
											sx={{
												color: 'white',
											}}
										/>
									</Stack>
								</CustomizeBoxContain>

								<CustomizeBoxContain>
									{selectedSpell.desc.map((item, index) => (
										<Typography variant="body1" key={index}>
											{item}
										</Typography>
									))}
								</CustomizeBoxContain>
								<CustomizeBoxContain>
									<Typography variant="h6" color="white">
										Damage and Cast time
									</Typography>
									<Typography variant="body1">
										<Typography component={'span'} variant="body1" color="white">
											Range:{' '}
										</Typography>
										{selectedSpell.range}
									</Typography>
									<Typography variant="body1">
										<Typography component={'span'} variant="body1" color="white">
											Type:{' '}
										</Typography>{' '}
										{selectedSpell.damage?.damage_type.name}
									</Typography>
									{selectedSpell.damage?.damage_at_character_level && (
										<Typography variant="body1">
											<Typography component={'span'} variant="body1" color="white">
												Damge at characters level:{' '}
											</Typography>{' '}
											<Grid container>
												{Array.from({ length: 20 }, (_, i) => i + 1).map((value, index) => {
													return (
														<>
															{selectedSpell.damage?.damage_at_character_level[value] && (
																<Grid item xs={6} key={`${value} - ${index}`}>
																	<Typography variant="body1">
																		{value}: {selectedSpell.damage.damage_at_character_level[value]}
																	</Typography>
																</Grid>
															)}
														</>
													);
												})}
											</Grid>
										</Typography>
									)}
									{selectedSpell.damage?.damage_at_slot_level && (
										<Typography variant="body1">
											<Typography component={'span'} variant="body1" color="white">
												Damge at slot level:{' '}
											</Typography>{' '}
											<Grid container>
												{Array.from({ length: 20 }, (_, i) => i + 1).map((value, index) => {
													return (
														<>
															{selectedSpell.damage?.damage_at_slot_level[value] && (
																<Grid item xs={6}>
																	<Typography variant="body1" key={`${value} - ${index}`}>
																		{value}: {selectedSpell.damage.damage_at_slot_level[value]}
																	</Typography>
																</Grid>
															)}
														</>
													);
												})}
											</Grid>
										</Typography>
									)}
									<Typography variant="body1">
										<Typography component={'span'} variant="body1" color="white">
											Cast time:
										</Typography>{' '}
										{selectedSpell.casting_time}
									</Typography>
									<Typography variant="body1">
										<Typography component={'span'} variant="body1" color="white">
											Concentration:
										</Typography>{' '}
										{selectedSpell.concentration ? 'Required' : 'Unrequired'}
									</Typography>
									<Typography variant="body1">
										<Typography component={'span'} variant="body1" color="white">
											Effect last:
										</Typography>{' '}
										{selectedSpell.duration}
									</Typography>
								</CustomizeBoxContain>
								<CustomizeBoxContain>
									<Typography variant="h6" color="white">
										Required components of the spell
									</Typography>
									{selectedSpell.components.map((item, index) => (
										<Typography variant="body1" key={index}>
											{renderComponentSpell(item)}
										</Typography>
									))}
								</CustomizeBoxContain>
								<CustomizeBoxContain>
									<Typography variant="h6" color="white">
										Classes
									</Typography>
									{selectedSpell.classes.map((item, index) => (
										<Typography variant="body1" key={`${index} - ${item.name}`}>
											{item.name}
										</Typography>
									))}
								</CustomizeBoxContain>
								<CustomizeBoxContain>
									<Typography variant="h6" color="white">
										Sub-Classes
									</Typography>
									{selectedSpell.subclasses.map((item, index) => (
										<Typography variant="body1" key={`${index} - ${item.name}`}>
											{item.name}
										</Typography>
									))}
								</CustomizeBoxContain>
								{selectedSpell.higher_level.length !== 0 && (
									<CustomizeBoxContain>
										<Typography variant="h6" color="white">
											How to cast the spell at higher levels.
										</Typography>
										{selectedSpell.higher_level.map((item, index) => (
											<Typography variant="body1" key={`${index} - ${item}`}>
												{item}
											</Typography>
										))}
									</CustomizeBoxContain>
								)}
							</>
						)}
					</Paper>
				</Typography>
			) : (
				<>
					<CommonLoading open={true} />
				</>
			)}
		</>
	);
};

export default SpellDetail;
