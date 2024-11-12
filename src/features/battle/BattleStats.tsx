import { Box, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";

export const BattleStats: React.FC = () => {
	const battle = useAppSelector((state) => state.battle.battle);

	if (!battle) {
		return null;
	}

	return (
		<Box display="flex" justifyContent="center" gap={{ xs: 2, sm: 3 }}>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography variant="body2" color="secondary.main" fontSize={{ sm: 16 }}>
					Battle
				</Typography>
				<Typography variant="body2" fontSize={{ sm: 16 }}>
					{battle.level}
				</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography variant="body2" color="secondary.main" fontSize={{ sm: 16 }}>
					Turn
				</Typography>
				<Typography variant="body2" fontSize={{ sm: 16 }}>
					{battle.turns.length + 1}
				</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography variant="body2" color="secondary.main" fontSize={{ sm: 16 }}>
					Gold
				</Typography>
				<Typography variant="body2" fontSize={{ sm: 16 }}>
					{battle.multiplier}x
				</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography variant="body2" color="secondary.main" fontSize={{ sm: 16 }}>
					Zone
				</Typography>
				<Typography variant="body2" fontSize={{ sm: 16 }} textTransform="capitalize">
					{battle.zone}
				</Typography>
			</Box>
		</Box>
	);
};
