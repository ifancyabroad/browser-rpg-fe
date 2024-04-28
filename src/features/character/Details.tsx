import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import {
	PropertyType,
	RESISTANCES,
	RESISTANCES_ABBR_MAP,
	RESISTANCES_NAME_MAP,
	STATS,
	STATS_ABBR_MAP,
	STATS_NAME_MAP,
} from "common/utils";
import { getEquipmentBonus } from "features/character/characterSlice";

interface IStat {
	name: string;
	abbreviation: string;
	value: number | string;
}

interface IProps {
	stats: IStat[];
}

const StatList: React.FC<IProps> = ({ stats }) => (
	<Grid container spacing={2}>
		{stats.map(({ name, abbreviation, value }) => (
			<Grid key={abbreviation} item xs={2}>
				<Tooltip title={name} placement="top">
					<Box textAlign="center">
						<Typography variant="caption" color="textSecondary">
							{abbreviation}
						</Typography>
						<Typography variant="body1">{value}</Typography>
					</Box>
				</Tooltip>
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
	const mappedStats = STATS.map((type) => ({
		name: STATS_NAME_MAP[type],
		abbreviation: STATS_ABBR_MAP[type],
		value: stats[type],
	}));
	const mappedResistances = RESISTANCES.map((type) => ({
		name: RESISTANCES_NAME_MAP[type],
		abbreviation: RESISTANCES_ABBR_MAP[type],
		value: `${resistances[type]}%`,
	}));
	const mappedDamage = RESISTANCES.map((type) => ({
		name: RESISTANCES_NAME_MAP[type],
		abbreviation: RESISTANCES_ABBR_MAP[type],
		value: `${equipmentBonus(PropertyType.Damage, type)}%`,
	}));

	return (
		<Stack spacing={2}>
			<Box display="flex" justifyContent="space-between" gap={1}>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Armour Class</Typography>
					<Typography>{character.armourClass}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Hit Bonus</Typography>
					<Typography>{character.hitBonus}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Crit Bonus</Typography>
					<Typography>{character.critBonus}</Typography>
				</Box>
			</Box>
			<Stack spacing={1}>
				<Box>
					<Typography color="info.main" mb={1}>
						Attributes
					</Typography>
					<StatList stats={mappedStats} />
				</Box>
				<Box>
					<Typography color="info.main" mb={1}>
						Resistances
					</Typography>
					<StatList stats={mappedResistances} />
				</Box>
				<Box>
					<Typography color="info.main" mb={1}>
						Damage
					</Typography>
					<StatList stats={mappedDamage} />
				</Box>
			</Stack>
		</Stack>
	);
};
