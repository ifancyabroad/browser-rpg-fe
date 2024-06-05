import {
	Grid,
	Stack,
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
	AuxiliaryStat,
	PropertyType,
	RESISTANCES,
	RESISTANCES_ABBR_MAP,
	RESISTANCES_NAME_MAP,
	STATS,
	STATS_ABBR_MAP,
	STATS_NAME_MAP,
} from "common/utils";
import { getBaseArmourClass, getEquipmentBonus } from "features/character/characterSlice";

interface IBonus {
	name: string;
	value: number;
}

interface IStat {
	name: string;
	abbreviation: string;
	baseValue: number;
	value: number;
	bonuses: IBonus[];
	suffix?: string;
}

const getValueColor = (value: number, baseValue: number = 0) => {
	if (value < baseValue) {
		return "error.main";
	} else if (value > baseValue) {
		return "success.main";
	} else {
		return "text.primary";
	}
};

const StatBonuses: React.FC<{ bonuses: IBonus[] }> = ({ bonuses }) => (
	<Stack>
		{bonuses.map(({ name, value }) => (
			<Typography key={name} color={getValueColor(value)} variant="body2">
				{value > 0 ? `+${value}` : value} {name}
			</Typography>
		))}
	</Stack>
);

interface IProps {
	title: string;
	stats: IStat[];
}

const StatList: React.FC<IProps> = ({ title, stats }) => {
	return (
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
					{stats.map(({ name, abbreviation, value, baseValue, bonuses, suffix }) => (
						<TableRow key={abbreviation}>
							<TableCell>
								<Tooltip title={name} placement="top">
									<Typography color="secondary">{abbreviation}</Typography>
								</Tooltip>
							</TableCell>
							<TableCell>
								<Tooltip
									title={bonuses.length > 0 ? <StatBonuses bonuses={bonuses} /> : null}
									placement="top"
								>
									<Typography color={getValueColor(value, baseValue)}>
										{value}
										{suffix}
									</Typography>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export const Details: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const equipmentBonus = useAppSelector(getEquipmentBonus);
	const baseArmourClass = useAppSelector(getBaseArmourClass);

	if (!character) {
		return null;
	}

	const { resistances, baseResistances, damageBonuses, stats, baseStats } = character;
	const mappedStats = STATS.map((type) => ({
		name: STATS_NAME_MAP[type],
		abbreviation: STATS_ABBR_MAP[type],
		baseValue: baseStats[type],
		value: stats[type],
		bonuses: equipmentBonus(PropertyType.Stat, type),
	}));
	const mappedResistances = RESISTANCES.map((type) => ({
		name: RESISTANCES_NAME_MAP[type],
		abbreviation: RESISTANCES_ABBR_MAP[type],
		baseValue: baseResistances[type],
		value: resistances[type],
		bonuses: equipmentBonus(PropertyType.Resistance, type),
		suffix: "%",
	}));
	const mappedDamage = RESISTANCES.map((type) => ({
		name: RESISTANCES_NAME_MAP[type],
		abbreviation: RESISTANCES_ABBR_MAP[type],
		baseValue: 0,
		value: damageBonuses[type],
		bonuses: equipmentBonus(PropertyType.Damage, type),
		suffix: "%",
	}));
	const bonusStats = [
		{
			name: "Armour Class",
			abbreviation: "AC",
			baseValue: baseArmourClass,
			value: character.armourClass,
			bonuses: equipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.ArmourClass),
		},
		{
			name: "Hit Bonus",
			abbreviation: "HB",
			baseValue: 0,
			value: character.hitBonus,
			bonuses: equipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.HitChance),
		},
		{
			name: "Crit Bonus",
			abbreviation: "CB",
			baseValue: 0,
			value: character.critBonus,
			bonuses: equipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.CritChance),
		},
	];

	return (
		<Grid container spacing={1}>
			<Grid item xs={4}>
				<StatList title="Attributes" stats={mappedStats} />
				<StatList title="Bonuses" stats={bonusStats} />
			</Grid>
			<Grid item xs={4}>
				<StatList title="Resistances" stats={mappedResistances} />
			</Grid>
			<Grid item xs={4}>
				<StatList title="Damage" stats={mappedDamage} />
			</Grid>
		</Grid>
	);
};
