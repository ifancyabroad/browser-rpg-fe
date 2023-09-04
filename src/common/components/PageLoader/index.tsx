import { Box, CircularProgress } from "@mui/material";

export const PageLoader: React.FC = () => (
	<Box
		sx={{
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<CircularProgress />
	</Box>
);
