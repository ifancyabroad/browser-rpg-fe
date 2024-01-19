import { Box } from "@mui/material";
import { Loader } from "common/components";

export const PageLoader: React.FC = () => (
	<Box
		sx={{
			backgroundColor: "background.default",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Loader />
	</Box>
);
