import { Box, Dialog, DialogActions, DialogContent, Grid, Link, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeCharacterModal, openEquipmentModal, openSkillModal } from "./modalsSlice";
import { IArmour, ISkill, IWeapon } from "common/types";
import { EquipmentIcon, HoverButton, SkillIcon, StatBonuses } from "common/components";
import {
	AuxiliaryStat,
	EQUIPMENT_TYPE_NAME_MAP,
	getItemPropertyBonus,
	getSkillType,
	getValueColor,
	ITEM_RARITY_COLOR_MAP,
	ItemRarity,
	PropertyType,
	SKILL_TYPE_NAME_MAP,
	STATS,
	STATS_NAME_MAP,
} from "common/utils";

interface IBonus {
	name: string;
	value: number;
}

interface IStatItemProps {
	name: string;
	value: number;
	baseValue: number;
	bonuses: IBonus[];
	max?: number;
}

const StatItem: React.FC<IStatItemProps> = ({ name, value, baseValue, bonuses, max }) => {
	return (
		<Box display="flex" justifyContent="space-between">
			<Typography color="secondary.main">{name}</Typography>

			<Tooltip
				title={bonuses.length > 0 ? <StatBonuses baseValue={baseValue} bonuses={bonuses} /> : null}
				placement="top"
			>
				<Typography color={getValueColor(value, baseValue, max)}>
					<Box component="span" color="error.main" visibility={max && value >= max ? "visible" : "hidden"}>
						(M){" "}
					</Box>
					{value}
				</Typography>
			</Tooltip>
		</Box>
	);
};

const EquipmentItem: React.FC<{ equipment: IWeapon | IArmour }> = ({ equipment }) => {
	const dispatch = useAppDispatch();

	const handleViewEquipment = () => {
		dispatch(openEquipmentModal({ item: equipment }));
	};

	return (
		<HoverButton
			onClick={handleViewEquipment}
			sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={1} maxWidth="100%">
				<EquipmentIcon equipment={equipment} />
				<Stack overflow="hidden">
					<Typography color={ITEM_RARITY_COLOR_MAP[equipment.level as ItemRarity]} noWrap>
						{equipment.name}
					</Typography>
					<Typography variant="body2" noWrap>
						Level {equipment.level} {EQUIPMENT_TYPE_NAME_MAP[equipment.type]}
					</Typography>
				</Stack>
			</Box>
		</HoverButton>
	);
};

const SkillItem: React.FC<{ skill: ISkill }> = ({ skill }) => {
	const dispatch = useAppDispatch();

	const handleViewSkill = () => {
		dispatch(openSkillModal({ skill }));
	};

	const type = getSkillType(skill);

	if (skill.level === 0) {
		return null;
	}

	return (
		<HoverButton
			onClick={handleViewSkill}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 1,
				p: 1,
			}}
		>
			<Box display="flex" alignItems="center" gap={1} maxWidth="100%">
				<SkillIcon skill={skill} />
				<Stack overflow="hidden">
					<Typography color="text.secondary" noWrap>
						{skill.name}
					</Typography>
					<Typography variant="body2" noWrap>
						Level {skill.level} {SKILL_TYPE_NAME_MAP[type]}
					</Typography>
				</Stack>
			</Box>
		</HoverButton>
	);
};

export const CharacterModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, character } = useAppSelector((state) => state.modals.characterModal);

	const handleClose = () => {
		dispatch(closeCharacterModal());
	};

	if (!character) {
		return null;
	}

	const { name, skills, equipmentAsArray, characterClass, level, stats, baseStats, kills } = character;
	const { portrait } = characterClass;
	const baseArmourClass = character.equipment.body?.armourClass ?? 0;

	const getEquipmentBonus = (type: PropertyType, property: string) => {
		return equipmentAsArray
			.map((item) => getItemPropertyBonus(item, type, property))
			.filter(({ value }) => value !== 0);
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md">
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3} textAlign="center">
						<Box
							sx={{
								position: "relative",
								height: "100%",
								minHeight: "400px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<Box
								sx={{
									position: "absolute",
									height: "100%",
									width: "100%",
									backgroundImage: `url(${portrait})`,
									backgroundSize: "cover",
									backgroundPosition: "top center",
									opacity: 0.3,
								}}
							/>
							<Box sx={{ position: "relative", zIndex: 1 }}>
								<Typography variant="h6" color="primary.main">
									{name}
								</Typography>
								<Typography color="text.secondary">
									Level {level} {characterClass.name}
								</Typography>
								<Typography>
									{kills} {kills === 1 ? "kill" : "kills"}
								</Typography>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1}>
							<Typography color="text.secondary">Attributes</Typography>
							<Stack spacing={1}>
								{STATS.map((stat) => (
									<StatItem
										key={stat}
										name={STATS_NAME_MAP[stat]}
										value={stats[stat]}
										baseValue={baseStats[stat]}
										bonuses={getEquipmentBonus(PropertyType.Stat, stat)}
									/>
								))}
							</Stack>
							<Typography color="text.secondary">Bonuses</Typography>
							<Stack spacing={1}>
								<StatItem
									name="Armour Class"
									value={character.armourClass}
									baseValue={baseArmourClass}
									bonuses={getEquipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.ArmourClass)}
								/>
								<StatItem
									name="Hit Bonus"
									value={character.hitBonus}
									baseValue={0}
									bonuses={getEquipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.HitChance)}
								/>
								<StatItem
									name="Crit Bonus"
									value={character.critBonus}
									baseValue={0}
									bonuses={getEquipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.CritChance)}
								/>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack>
							<Typography color="text.secondary" mb={1}>
								Equipment
							</Typography>
							{equipmentAsArray.map((equipment) => (
								<EquipmentItem key={equipment.id} equipment={equipment} />
							))}
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack>
							<Typography color="text.secondary" mb={1}>
								Skills
							</Typography>
							{skills.map((skill) => (
								<SkillItem key={skill.id} skill={skill} />
							))}
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
