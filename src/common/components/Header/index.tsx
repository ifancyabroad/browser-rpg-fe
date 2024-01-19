import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "features/authentication";
import { openLoginModal } from "features/modals";
import logo from "assets/images/logos/browser_heroes.png";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { openLeaderboard } from "features/leaderboard";
import { ReactComponent as LevelIcon } from "assets/images/icons/stairs.svg";
import { ReactComponent as DayIcon } from "assets/images/icons/sun.svg";
import { ReactComponent as GoldIcon } from "assets/images/icons/coins.svg";
import { ReactComponent as KillsIcon } from "assets/images/icons/death-skull.svg";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const isLoggedIn = useAppSelector((state) => state.authentication.session);
	const character = useAppSelector((state) => state.character.character);

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

	const handleOpenLeaderboard = () => {
		dispatch(openLeaderboard());
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

			{character && (
				<Box
					sx={{
						display: "flex",
						gap: 3,
						mr: 5,
					}}
				>
					<Tooltip title="Level" placement="top" arrow>
						<Box display="flex" alignItems="center" gap={1}>
							<LevelIcon height={16} width={16} />
							<Typography variant="body2">{character.map.location.level + 1}</Typography>
						</Box>
					</Tooltip>
					<Tooltip title="Day" placement="top" arrow>
						<Box display="flex" alignItems="center" gap={1}>
							<DayIcon height={16} width={16} />
							<Typography variant="body2">{character.day}</Typography>
						</Box>
					</Tooltip>
					<Tooltip title="Gold" placement="top" arrow>
						<Box display="flex" alignItems="center" gap={1}>
							<GoldIcon height={16} width={16} />
							<Typography variant="body2">{character.gold}</Typography>
						</Box>
					</Tooltip>
					<Tooltip title="Kills" placement="top" arrow>
						<Box display="flex" alignItems="center" gap={1}>
							<KillsIcon height={16} width={16} />
							<Typography variant="body2">{character.kills}</Typography>
						</Box>
					</Tooltip>
				</Box>
			)}

			<Box>
				<IconButton aria-label="leaderboard" color="inherit" type="button" onClick={handleOpenLeaderboard}>
					<EqualizerIcon fontSize="small" />
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
