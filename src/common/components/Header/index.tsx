import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "features/authentication";
import { openLoginModal } from "features/modals";
import logo from "assets/images/logos/browser_heroes.png";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { openCharacterSheet } from "features/character";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const isLoggedIn = useAppSelector((state) => state.authentication.session);

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
			<IconButton
				aria-label="menu"
				color="inherit"
				type="button"
				onClick={handleDrawerToggle}
				sx={{ display: { md: "none" } }}
			>
				<PsychologyIcon fontSize="small" />
			</IconButton>

			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: {
						xs: "center",
						md: "flex-start",
					},
					gap: 2,
				}}
			>
				<Box component="img" src={logo} height={32} width={32} />
				<Typography variant="h6" fontFamily="'Cinzel', serif" fontWeight="bold">
					Browser Heroes
				</Typography>
			</Box>

			<IconButton aria-label="menu" color="inherit" type="button" onClick={handleOpenMenu}>
				<MenuIcon fontSize="small" />
			</IconButton>
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
