import { Box } from "@mui/material";

interface IProps {
	children: React.ReactNode;
}

export const HOCLayout: React.FC<IProps> = ({ children }) => {
	return <Box>{children}</Box>;
};
