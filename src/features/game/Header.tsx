import { Box, Container, IconButton, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "common/hooks";
import { openCharacterSheet } from "features/character";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleDrawerToggle = () => {
		dispatch(openCharacterSheet());
	};

	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" justifyContent="space-between" gap={3}>
					<IconButton
						onClick={handleDrawerToggle}
						sx={{
							visibility: { md: "hidden" },
						}}
					>
						<MenuIcon />
					</IconButton>

					<MuiLink component={Link} to="/">
						&lt; Back
					</MuiLink>
				</Box>
			</Container>
		</Box>
	);
};
