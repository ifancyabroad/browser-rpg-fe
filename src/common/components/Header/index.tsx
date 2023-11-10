import { Fragment, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "features/authentication";
import { retireCharacter } from "features/character";
import { ConfirmationModal } from "features/modals";
import logo from "assets/images/logos/browser_heroes.png";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	const handleRetire = async () => {
		await dispatch(retireCharacter());
		setIsConfirmationOpen(false);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	return (
		<Fragment>
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
					{character && <MenuItem onClick={openConfirmationModal}>Retire Character</MenuItem>}
					<MenuItem onClick={handleLogout}>Sign Out</MenuItem>
				</Menu>
			</Box>

			<ConfirmationModal
				title="Are you sure?"
				content="Once your character has retired you will no longer be able to access them."
				handleClose={closeConfirmationModal}
				handleConfirm={handleRetire}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
