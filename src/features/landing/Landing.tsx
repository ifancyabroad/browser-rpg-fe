import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openLoginModal } from "features/modals";

export const Landing: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleLogin = () => {
		dispatch(openLoginModal());
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h5">BROWSER HEROES</Typography>
			<Typography>Click the button below to login!</Typography>
			<Button variant="contained" onClick={handleLogin}>
				LOGIN
			</Button>
		</Box>
	);
};
