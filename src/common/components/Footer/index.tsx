import { Box, Container, Typography } from "@mui/material";

export const Footer: React.FC = () => {
	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Typography variant="body2" textAlign="center">
					&copy; {new Date().getFullYear()} Browser Heroes
				</Typography>
			</Container>
		</Box>
	);
};
