import { Box } from "@mui/material";
import { Header } from "common/components";
import background from "assets/images/background/bgtile.webp";
import background2 from "assets/images/background/bgtile2.webp";

interface IProps {
	children: React.ReactNode;
}

export const HOCLayout: React.FC<IProps> = ({ children }) => {
	return (
		<Box
			sx={{
				backgroundImage: `url(${background2}), url(${background})`,
				backgroundPosition: "0px 0px, 0px 0px",
				backgroundRepeat: "repeat-x, repeat",
				boxShadow: "inset 0px 0px 0px 1px rgba(255,255,255,0.09)",
			}}
		>
			<Header />
			{children}
		</Box>
	);
};
