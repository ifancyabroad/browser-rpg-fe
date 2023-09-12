import { EquipmentSlot, EquipmentType, SkillType, Stat, WeaponType } from "common/utils";

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
