import { Box } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { CombatLog } from "./CombatLog";

export const BattleDetails: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);

	if (!character || !battle) {
		return null;
	}

	return (
		<Box sx={{ height: "100%" }}>
			<CombatLog turns={battle.turns} />
		</Box>
	);
};
