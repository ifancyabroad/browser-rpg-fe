import { Box, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";

export const BattleStats: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);

	if (!character || !battle) {
		return null;
	}

	return (
		<Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Battle</Typography>
				<Typography>{battle.level}</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Highest</Typography>
				<Typography>{character.maxBattleLevel}</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Gold</Typography>
				<Typography>{character.streak + 1}x</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Zone</Typography>
				<Typography textTransform="capitalize">{battle.zone}</Typography>
			</Box>
		</Box>
	);
};
