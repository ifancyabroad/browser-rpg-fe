import { Box, Container, IconButton, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "common/hooks";
import { openCharacterSheet } from "features/character";
import { openHowToPlayModal } from "features/modals";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleDrawerToggle = () => {
		dispatch(openCharacterSheet());
	};

	const handleOpenTutorial = () => {
		dispatch(openHowToPlayModal());
	};

	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={3}>
					<IconButton
						onClick={handleDrawerToggle}
						sx={{
							visibility: { md: "hidden" },
						}}
					>
						<MenuIcon />
					</IconButton>

					<Box display="flex" alignItems="center" gap={3}>
						<MuiLink component="button" color="text.secondary" onClick={handleOpenTutorial}>
							How to Play
						</MuiLink>
						<MuiLink component={Link} to="/">
							&lt; Back
						</MuiLink>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
