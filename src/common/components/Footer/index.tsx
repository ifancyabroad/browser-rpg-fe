import { Box, Container, Link, Typography } from "@mui/material";

export const Footer: React.FC = () => {
	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Typography variant="body2" textAlign="center">
					For any questions or comments please email me at{" "}
					<Link href="mailto:edgar.nightingale@btinternet.com">edgar.nightingale@btinternet.com</Link>
				</Typography>
			</Container>
		</Box>
	);
};
