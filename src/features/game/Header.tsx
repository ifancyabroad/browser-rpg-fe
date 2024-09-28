import { Box, Container, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { CharacterButton } from "common/components";

export const Header: React.FC = () => (
	<Box py={1}>
		<Container maxWidth={false}>
			<Box display="flex" justifyContent="space-between" gap={3}>
				<CharacterButton />

				<MuiLink component={Link} to="/">
					&lt; Back
				</MuiLink>
			</Box>
		</Container>
	</Box>
);
