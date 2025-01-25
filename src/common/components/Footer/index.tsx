import { Box, Container, Typography } from "@mui/material";
import { CoffeeButton } from "common/components";

export const Footer: React.FC = () => {
	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" justifyContent="center" alignItems="center" gap={{ xs: 1, sm: 2 }}>
					<Typography variant="body2" textAlign="center">
						&copy; {new Date().getFullYear()} Browser Heroes
					</Typography>
					|
					<CoffeeButton />
				</Box>
			</Container>
		</Box>
	);
};
