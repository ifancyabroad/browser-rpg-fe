import { Box, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";

export const BattleStats: React.FC = () => {
	const battle = useAppSelector((state) => state.battle.battle);

	if (!battle) {
		return null;
	}

	return (
		<Box display="flex" justifyContent="center" flexWrap="wrap" gap={{ xs: 2, md: 3 }}>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Battle</Typography>
				<Typography>{battle.level}</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Turn</Typography>
				<Typography>{battle.turns.length + 1}</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Gold</Typography>
				<Typography>{battle.multiplier}x</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="secondary.main">Zone</Typography>
				<Typography textTransform="capitalize">{battle.zone}</Typography>
			</Box>
		</Box>
	);
};
