import { Box, Container, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export const Header: React.FC = () => (
	<Box py={1}>
		<Container maxWidth={false}>
			<Box display="flex" justifyContent="flex-end" gap={3}>
				<MuiLink component={Link} to="/">
					&lt; Back
				</MuiLink>
			</Box>
		</Container>
	</Box>
);
