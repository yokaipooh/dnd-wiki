import { Backdrop, CircularProgress } from '@mui/material';

interface CommonLoadingProps {
	open: boolean;
}

const CommonLoading: React.FC<CommonLoadingProps> = (prop) => {
	const { open } = prop;
	return (
		<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default CommonLoading;
