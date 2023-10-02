import { AuxiliaryStat, DamageType, EquipmentSlot, EquipmentType, SkillType, Stat, WeaponType } from "common/utils";

export const STATS = [
	Stat.Strength,
	Stat.Dexterity,
	Stat.Constitution,
	Stat.Intelligence,
	Stat.Wisdom,
	Stat.Charisma,
] as const;

export const AUXILIARY_STATS = [AuxiliaryStat.Defence, AuxiliaryStat.HitChance, AuxiliaryStat.CritChance] as const;

export const RESISTANCES = [
	DamageType.Slashing,
	DamageType.Crushing,
	DamageType.Piercing,
	DamageType.Cold,
	DamageType.Fire,
	DamageType.Lighting,
	DamageType.Radiant,
	DamageType.Necrotic,
	DamageType.Poison,
	DamageType.Acid,
] as const;

export const STATS_ABBR_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "CHR",
	[Stat.Constitution]: "CON",
	[Stat.Dexterity]: "DEX",
	[Stat.Intelligence]: "INT",
	[Stat.Strength]: "STR",
	[Stat.Wisdom]: "WIS",
};

export const STATS_NAME_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "Charisma",
	[Stat.Constitution]: "Constitution",
	[Stat.Dexterity]: "Dexterity",
	[Stat.Intelligence]: "Intelligence",
	[Stat.Strength]: "Strength",
	[Stat.Wisdom]: "Wisdom",
};

export const AUXILIARY_STATS_ABBR_MAP: Record<AuxiliaryStat, string> = {
	[AuxiliaryStat.Defence]: "DEF",
	[AuxiliaryStat.HitChance]: "HIT",
	[AuxiliaryStat.CritChance]: "CRT",
	[AuxiliaryStat.HitPoints]: "HPS",
};

export const AUXILIARY_STATS_NAME_MAP: Record<AuxiliaryStat, string> = {
	[AuxiliaryStat.Defence]: "Defence",
	[AuxiliaryStat.HitChance]: "Hit Chance",
	[AuxiliaryStat.CritChance]: "Crit Chance",
	[AuxiliaryStat.HitPoints]: "Hit Points",
};

export const RESISTANCES_ABBR_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "SLA",
	[DamageType.Crushing]: "CRU",
	[DamageType.Piercing]: "PIE",
	[DamageType.Cold]: "CLD",
	[DamageType.Fire]: "FRE",
	[DamageType.Lighting]: "LTG",
	[DamageType.Radiant]: "RAD",
	[DamageType.Necrotic]: "NEC",
	[DamageType.Poison]: "PSN",
	[DamageType.Acid]: "ACD",
};

export const RESISTANCES_NAME_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "Slashing",
	[DamageType.Crushing]: "Crushing",
	[DamageType.Piercing]: "Piercing",
	[DamageType.Cold]: "Cold",
	[DamageType.Fire]: "Fire",
	[DamageType.Lighting]: "Lighting",
	[DamageType.Radiant]: "Radiant",
	[DamageType.Necrotic]: "Necrotic",
	[DamageType.Poison]: "Poison",
	[DamageType.Acid]: "Acid",
};

export const RESISTANCES_COLOUR_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "#607466",
	[DamageType.Crushing]: "#6C6F7D",
	[DamageType.Piercing]: "#F2D1C9",
	[DamageType.Cold]: "#92D5E6",
	[DamageType.Fire]: "#E4572E",
	[DamageType.Lighting]: "#F9DC5C",
	[DamageType.Radiant]: "#F3FFBD",
	[DamageType.Necrotic]: "#5A0B4D",
	[DamageType.Poison]: "#157145",
	[DamageType.Acid]: "#A1EF8B",
};

export const SKILL_TYPE_NAME_MAP: Record<SkillType, string> = {
	[SkillType.WeaponAttack]: "Weapon Attack",
	[SkillType.Attack]: "Attack",
	[SkillType.Heal]: "Heal",
	[SkillType.Buff]: "Buff",
	[SkillType.Debuff]: "Debuff",
	[SkillType.Other]: "Other",
};

export const EQUIPMENT_TYPE_NAME_MAP: Record<EquipmentType | WeaponType, string> = {
	[EquipmentType.Amulet]: "Amulet",
	[EquipmentType.Armour]: "Armour",
	[EquipmentType.Belt]: "Belt",
	[EquipmentType.Boots]: "Boots",
	[EquipmentType.Gloves]: "Gloves",
	[EquipmentType.Helmet]: "Helmet",
	[EquipmentType.Ring]: "Ring",
	[EquipmentType.Shield]: "Shield",
	[EquipmentType.Weapon]: "Weapon",
	[WeaponType.Axe]: "Axe",
	[WeaponType.Bow]: "Bow",
	[WeaponType.Club]: "Club",
	[WeaponType.Crossbow]: "Crossbow",
	[WeaponType.Dagger]: "Dagger",
	[WeaponType.Hammer]: "Hammer",
	[WeaponType.Mace]: "Mace",
	[WeaponType.Spear]: "Spear",
	[WeaponType.Staff]: "Staff",
	[WeaponType.Sword]: "Sword",
};

export const EQUIPMENT_SLOT_TYPE_MAP: Record<EquipmentType, EquipmentSlot[]> = {
	[EquipmentType.Helmet]: [EquipmentSlot.Head],
	[EquipmentType.Amulet]: [EquipmentSlot.Neck],
	[EquipmentType.Armour]: [EquipmentSlot.Body],
	[EquipmentType.Belt]: [EquipmentSlot.Waist],
	[EquipmentType.Gloves]: [EquipmentSlot.Hands],
	[EquipmentType.Boots]: [EquipmentSlot.Feet],
	[EquipmentType.Ring]: [EquipmentSlot.Finger1, EquipmentSlot.Finger2],
	[EquipmentType.Weapon]: [EquipmentSlot.Hand1, EquipmentSlot.Hand2],
	[EquipmentType.Shield]: [EquipmentSlot.Hand2],
};

export const EQUIPMENT_SLOTS = [
	EquipmentSlot.Head,
	EquipmentSlot.Neck,
	EquipmentSlot.Body,
	EquipmentSlot.Waist,
	EquipmentSlot.Hands,
	EquipmentSlot.Feet,
	EquipmentSlot.Finger1,
	EquipmentSlot.Finger2,
	EquipmentSlot.Hand1,
	EquipmentSlot.Hand2,
] as const;

export const EQUIPMENT_SLOT_NAME_MAP: Record<EquipmentSlot, string> = {
	[EquipmentSlot.Head]: "Head",
	[EquipmentSlot.Neck]: "Neck",
	[EquipmentSlot.Body]: "Body",
	[EquipmentSlot.Waist]: "Waist",
	[EquipmentSlot.Hands]: "Hands",
	[EquipmentSlot.Feet]: "Feet",
	[EquipmentSlot.Finger1]: "Finger",
	[EquipmentSlot.Finger2]: "Finger",
	[EquipmentSlot.Hand1]: "Main Hand",
	[EquipmentSlot.Hand2]: "Off Hand",
};
