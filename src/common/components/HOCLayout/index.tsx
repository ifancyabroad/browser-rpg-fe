import { Box } from "@mui/material";
import { Header } from "common/components";

interface IProps {
	children: React.ReactNode;
}

export const HOCLayout: React.FC<IProps> = ({ children }) => {
	return (
		<Box>
			<Header />
			{children}
		</Box>
	);
};
