import { Box, Grid, Stack, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { PropertyType, RESISTANCES, RESISTANCES_ABBR_MAP, STATS, STATS_ABBR_MAP } from "common/utils";
import { getEquipmentBonus } from ".";

interface IStat {
	name: string;
	value: number | string;
}

interface IProps {
	stats: IStat[];
}

const StatList: React.FC<IProps> = ({ stats }) => (
	<Grid container spacing={2}>
		{stats.map(({ name, value }) => (
			<Grid key={name} item xs={2}>
				<Box textAlign="center">
					<Typography variant="caption" color="textSecondary">
						{name}
					</Typography>
					<Typography variant="body1">{value}</Typography>
				</Box>
			</Grid>
		))}
	</Grid>
);

export const Details: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const equipmentBonus = useAppSelector(getEquipmentBonus);

	if (!character) {
		return null;
	}

	const { resistances, stats } = character;
	const mappedStats = STATS.map((type) => ({ name: STATS_ABBR_MAP[type], value: stats[type] }));
	const mappedResistances = RESISTANCES.map((type) => ({
		name: RESISTANCES_ABBR_MAP[type],
		value: `${resistances[type]}%`,
	}));
	const mappedDamage = RESISTANCES.map((type) => ({
		name: RESISTANCES_ABBR_MAP[type],
		value: `${equipmentBonus(PropertyType.Damage, type)}%`,
	}));

	return (
		<Stack spacing={2} my={2}>
			<Box>
				<Typography variant="body2" mb={1}>
					Attributes
				</Typography>
				<StatList stats={mappedStats} />
			</Box>
			<Box>
				<Typography variant="body2" mb={1}>
					Resistances
				</Typography>
				<StatList stats={mappedResistances} />
			</Box>
			<Box>
				<Typography variant="body2" mb={1}>
					Damage
				</Typography>
				<StatList stats={mappedDamage} />
			</Box>
		</Stack>
	);
};
