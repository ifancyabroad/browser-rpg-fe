import { Fragment, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "features/authentication";
import { getActiveCharacterKills } from "features/character";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const kills = useAppSelector(getActiveCharacterKills);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", p: 1, bgcolor: "background.paper" }}>
			<Stack direction="row" spacing={2} flexGrow={1}>
				{character && (
					<Fragment>
						<Typography variant="body2">Day: {character.day}</Typography>
						<Typography variant="body2">Gold: {character.gold}</Typography>
						<Typography variant="body2">Kills: {kills}</Typography>
					</Fragment>
				)}
			</Stack>

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
				<MenuItem onClick={handleLogout}>Sign Out</MenuItem>
			</Menu>
		</Box>
	);
};
