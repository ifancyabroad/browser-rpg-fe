import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
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
	title: string;
	stats: IStat[];
}

const StatList: React.FC<IProps> = ({ title, stats }) => (
	<TableContainer>
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell colSpan={2} sx={{ color: "info.light" }}>
						{title}
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{stats.map(({ name, abbreviation, value }) => (
					<TableRow key={abbreviation}>
						<TableCell>
							<Tooltip title={name} placement="top">
								<Typography>{abbreviation}</Typography>
							</Tooltip>
						</TableCell>
						<TableCell>{value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
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
	const bonusStats = [
		{
			name: "Armour Class",
			abbreviation: "AC",
			value: character.armourClass,
		},
		{
			name: "Hit Bonus",
			abbreviation: "HB",
			value: character.hitBonus,
		},
		{
			name: "Crit Bonus",
			abbreviation: "CB",
			value: character.critBonus,
		},
	];

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} md={4}>
				<StatList title="Attributes" stats={mappedStats} />
				<StatList title="Bonuses" stats={bonusStats} />
			</Grid>
			<Grid item xs={12} md={4}>
				<StatList title="Resistances" stats={mappedResistances} />
			</Grid>
			<Grid item xs={12} md={4}>
				<StatList title="Damage" stats={mappedDamage} />
			</Grid>
		</Grid>
	);
};
