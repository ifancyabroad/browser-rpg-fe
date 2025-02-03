import { Box, Dialog, DialogActions, DialogContent, Grid, Link, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeCharacterModal, openEquipmentModal, openSkillModal } from "./modalsSlice";
import { IArmour, ICharacter, ISkill, IWeapon } from "common/types";
import { EquipmentIcon, HoverButton, SkillIcon, StatBonuses } from "common/components";
import {
	AuxiliaryStat,
	EQUIPMENT_TYPE_NAME_MAP,
	getItemPropertyBonus,
	getSkillType,
	getValueColor,
	ITEM_RARITY_COLOR_MAP,
	ITEM_RARITY_NAME_MAP,
	ItemRarity,
	PropertyType,
	SKILL_TYPE_NAME_MAP,
	STATS,
	STATS_NAME_MAP,
	Status,
} from "common/utils";
import { Fragment, useEffect } from "react";
import { fetchCharacterByID } from "features/character";

interface IBonus {
	name: string;
	value: number;
}

interface IStatItemProps {
	name: string;
	baseValue: number;
	bonuses: IBonus[];
	max?: number;
}

const StatItem: React.FC<IStatItemProps> = ({ name, baseValue, bonuses, max }) => {
	let value = baseValue + bonuses.reduce((acc, { value }) => acc + value, 0);

	if (max) {
		value = Math.min(value, max);
	}

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

export const EquipmentItem: React.FC<{ equipment: IWeapon | IArmour }> = ({ equipment }) => {
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
						{ITEM_RARITY_NAME_MAP[equipment.level as ItemRarity]} {EQUIPMENT_TYPE_NAME_MAP[equipment.type]}
					</Typography>
				</Stack>
			</Box>
		</HoverButton>
	);
};

export const SkillItem: React.FC<{ skill: ISkill }> = ({ skill }) => {
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

const CharacterContent: React.FC<ICharacter> = (character) => {
	const {
		name,
		skills,
		equipmentAsArray,
		characterClass,
		level,
		baseStats,
		kills,
		armourClass,
		equipment,
		activeStatusEffects,
		status,
		slainBy,
		day,
	} = character;
	const { portrait } = characterClass;
	const baseArmourClass = equipment.body?.armourClass ?? 0;

	const getActiveEffectBonus = (type: string, name: string) => {
		return activeStatusEffects
			.flatMap((effect) => effect.properties)
			.filter((property) => property.type === type && property.name === name)
			.reduce((n, { value }) => n + value, 0);
	};

	const getEquipmentBonus = (type: PropertyType, property: string) => {
		return equipmentAsArray
			.map((item) => getItemPropertyBonus(item, type, property))
			.filter(({ value }) => value !== 0);
	};

	const armourClassBonuses = getEquipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.ArmourClass);
	const armourClassBonus = armourClassBonuses.reduce((acc, { value }) => acc + value, 0);
	const activeEffectBonus = getActiveEffectBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.ArmourClass);
	const dexterityBonus = armourClass - activeEffectBonus - baseArmourClass - armourClassBonus;

	if (dexterityBonus !== 0) {
		armourClassBonuses.unshift({ name: "Dexterity", value: dexterityBonus });
	}

	return (
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
						<Typography>
							{day} {day === 1 ? "day" : "days"}
						</Typography>
						<Typography>
							{
								{
									[Status.Alive]: "Alive",
									[Status.Complete]: null, // Not being used
									[Status.Retired]: "Retired",
									[Status.Dead]: <Fragment>Slain By {slainBy}</Fragment>,
								}[status]
							}
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
								baseValue={baseStats[stat]}
								bonuses={getEquipmentBonus(PropertyType.Stat, stat)}
								max={30}
							/>
						))}
					</Stack>
					<Typography color="text.secondary">Bonuses</Typography>
					<Stack spacing={1}>
						<StatItem name="Armour Class" baseValue={baseArmourClass} bonuses={armourClassBonuses} />
						<StatItem
							name="Hit Bonus"
							baseValue={0}
							bonuses={getEquipmentBonus(PropertyType.AuxiliaryStat, AuxiliaryStat.HitChance)}
						/>
						<StatItem
							name="Crit Bonus"
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
					{equipmentAsArray.map((equipment, index) => (
						<EquipmentItem key={index} equipment={equipment} />
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
	);
};

export const CharacterModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, id } = useAppSelector((state) => state.modals.characterModal);
	const characters = useAppSelector((state) => state.character.characters);
	const character = id ? characters.find((c) => c.id === id) : null;

	useEffect(() => {
		if (!character && id) {
			dispatch(fetchCharacterByID(id));
		}
	}, [dispatch, character, id]);

	const handleClose = () => {
		dispatch(closeCharacterModal());
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md">
			<DialogContent>
				{!character ? (
					<Box height={400} display="flex" justifyContent="center" alignItems="center">
						<Typography>Loading...</Typography>
					</Box>
				) : (
					<CharacterContent {...character} />
				)}
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
