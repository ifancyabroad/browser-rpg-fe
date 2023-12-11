import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, keyframes, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "features/authentication";
import { openLoginModal } from "features/modals";
import logo from "assets/images/logos/browser_heroes.png";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { openCharacterSheet } from "features/character";
import { useMatch } from "react-router-dom";

const pulse = keyframes`
	0% {
		transform: scale(0.1);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
	}
	
	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
	}
	
	100% {
		transform: scale(0.1);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
	}
`;

const Pulse = styled("div")({
	position: "absolute",
	height: "100%",
	width: "100%",
	left: 0,
	top: 0,
	borderRadius: "50%",
	boxShadow: "0 0 0 0 rgba(255, 255, 255, 1)",
	animation: `${pulse} 2s infinite`,
});

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const isLoggedIn = useAppSelector((state) => state.authentication.session);
	const isGame = useMatch({ path: "/game", end: false });
	const isBattle = useMatch({ path: "/game/battle", end: true });
	const isCharacterSheetOpen = useAppSelector((state) => state.character.isCharacterSheetOpen);
	const showPulse = isBattle && !isCharacterSheetOpen;

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogin = () => {
		dispatch(openLoginModal());
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerToggle = () => {
		dispatch(openCharacterSheet());
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				p: 1,
				bgcolor: "background.paper",
				boxShadow: "inset 0px 1px 0px 0px rgba(255,255,255,0.07)",
				borderBottom: "1px solid #000",
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Box component="img" src={logo} height={32} width={32} />
				<Typography variant="h6" fontFamily="'Cinzel', serif" fontWeight="bold">
					Browser Heroes
				</Typography>
			</Box>

			<Box>
				<IconButton
					aria-label="menu"
					color="inherit"
					type="button"
					onClick={handleDrawerToggle}
					sx={{
						display: { md: "none" },
						position: "relative",
						visibility: !isGame ? "hidden" : null,
					}}
				>
					<Pulse sx={{ display: showPulse ? "block" : "none" }} />
					<PsychologyIcon fontSize="small" />
				</IconButton>
				<IconButton aria-label="menu" color="inherit" type="button" onClick={handleOpenMenu}>
					<MenuIcon fontSize="small" />
				</IconButton>
			</Box>

			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "lock-button",
					role: "listbox",
				}}
			>
				{isLoggedIn ? (
					<MenuItem onClick={handleLogout}>Sign Out</MenuItem>
				) : (
					<MenuItem onClick={handleLogin}>Sign In</MenuItem>
				)}
			</Menu>
		</Box>
	);
};
