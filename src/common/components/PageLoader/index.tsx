import { Box } from "@mui/material";
import { Loader } from "common/components";
import background from "assets/images/background/bgtile.webp";
import background2 from "assets/images/background/bgtile2.webp";

export const PageLoader: React.FC = () => (
	<Box
		sx={{
			backgroundImage: `url(${background2}), url(${background})`,
			backgroundPosition: "0px 0px, 0px 0px",
			backgroundRepeat: "repeat-x, repeat",
			boxShadow: "inset 0px 0px 0px 1px rgba(255,255,255,0.09)",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Loader />
	</Box>
);
