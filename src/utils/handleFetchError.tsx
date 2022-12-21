import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

const HandleFetchError = (err: any, cb?: (...f: any) => void) => {
	const [open, setOpen] = useState<boolean>(true);
	const navigate = useNavigate();

	if (typeof window === 'undefined') {
		return (
			<Snackbar
				autoHideDuration={3000}
				open={open}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={
					<span id="message-id">
						{err.msg ||
							err.error?.message ||
							err.meta?.message ||
							err.detail ||
							err.message ||
							err.toString()}
					</span>
				}
				onClose={() => setOpen(false)}
			/>
		);
	}

	if (err.statusCode === 403 || err.statusCode === 401) {
		navigate('/forbidden');
	}

	if (cb) cb(err);
	throw err;
};

export default HandleFetchError;
