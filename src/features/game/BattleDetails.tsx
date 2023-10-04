import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { CombatLog } from "./CombatLog";

export const BattleDetails: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.game.battle);

	if (!character || !battle) {
		return null;
	}

	return (
		<Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: "300px" }}>
			<Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h6">{battle.enemy.name} active effects</Typography>
				<Paper variant="outlined" sx={{ flex: 1, minHeight: "60px" }}>
					{[].map(() => (
						<div></div>
					))}
				</Paper>
			</Box>
			<Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h6">{character.name} active effects</Typography>
				<Paper variant="outlined" sx={{ flex: 1, minHeight: "60px" }}>
					{[].map(() => (
						<div></div>
					))}
				</Paper>
			</Box>
			<CombatLog turns={battle.turns} />
		</Box>
	);
};
