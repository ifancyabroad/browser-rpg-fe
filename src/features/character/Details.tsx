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
import defenceIcon from "assets/images/icons/shield.svg";
import hitIcon from "assets/images/icons/piercing-sword.svg";
import critIcon from "assets/images/icons/pointy-sword.svg";

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
				<Tooltip title={name} placement="top" arrow>
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
			<Box py={2}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Tooltip title="Defence" placement="top" arrow>
							<Stack spacing={1} textAlign="center" alignItems="center">
								<Box component="img" src={defenceIcon} width={32} />
								<Typography variant="body1">{character.defence}%</Typography>
							</Stack>
						</Tooltip>
					</Grid>
					<Grid item xs={4}>
						<Tooltip title="Hit Bonus" placement="top" arrow>
							<Stack spacing={1} textAlign="center" alignItems="center">
								<Box component="img" src={hitIcon} width={32} />
								<Typography variant="body1">{character.hitBonus}%</Typography>
							</Stack>
						</Tooltip>
					</Grid>
					<Grid item xs={4}>
						<Tooltip title="Crit Bonus" placement="top" arrow>
							<Stack spacing={1} textAlign="center" alignItems="center">
								<Box component="img" src={critIcon} width={32} />
								<Typography variant="body1">{character.critBonus}%</Typography>
							</Stack>
						</Tooltip>
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};
