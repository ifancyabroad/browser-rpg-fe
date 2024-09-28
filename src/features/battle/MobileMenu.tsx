import { Box, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeBattleStats, openBattleStats } from "./battleSlice";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";

export const MobileMenu: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.battle.isBattleStatsOpen);

	const toggleBattleStats = () => {
		if (open) {
			dispatch(closeBattleStats());
		} else {
			dispatch(openBattleStats());
		}
	};

	return (
		<Box display={{ xs: "flex", md: "none" }} gap={1}>
			<IconButton
				size="small"
				color={open ? "primary" : "default"}
				aria-label="Toggle Battle Stats"
				onClick={toggleBattleStats}
			>
				<MenuBookIcon />
			</IconButton>
		</Box>
	);
};
