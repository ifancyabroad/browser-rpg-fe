import {
	ArmourType,
	AuxiliaryEffect,
	AuxiliaryStat,
	CharacterClass,
	DamageType,
	EquipmentSlot,
	EquipmentType,
	ItemRarity,
	SkillClass,
	SkillType,
	Stat,
	Status,
	TileType,
	WeaponSize,
	WeaponType,
} from "common/utils";

export const STATS = [
	Stat.Strength,
	Stat.Dexterity,
	Stat.Constitution,
	Stat.Intelligence,
	Stat.Wisdom,
	Stat.Charisma,
] as const;

export const AUXILIARY_STATS = [AuxiliaryStat.ArmourClass, AuxiliaryStat.HitChance, AuxiliaryStat.CritChance] as const;

export const RESISTANCES = [
	DamageType.Slashing,
	DamageType.Crushing,
	DamageType.Piercing,
	DamageType.Cold,
	DamageType.Fire,
	DamageType.Lightning,
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

export const STATS_DESCRIPTION_MAP: Record<Stat, string> = {
	[Stat.Charisma]:
		"Charisma measures your character's personality and persuasiveness. It affects prices at the tavern, potion seller, and merchant.",
	[Stat.Constitution]:
		"Constitution represents your character's health and stamina. A high Constitution increases hit points.",
	[Stat.Dexterity]:
		"Dexterity measures agility, reflexes, and balance. It affects initiative, armour class with light or medium armour and skill with certain weapons.",
	[Stat.Intelligence]:
		"Intelligence reflects your character's ability to learn and reason. It affects damage of certain skills.",
	[Stat.Strength]: "Strength measures your character's physical power. It affects skill with certain weapons.",
	[Stat.Wisdom]: "Wisdom represents your character's insight and intuition. It affects damage of certain skills.",
};

export const STATS_SHORT_DESCRIPTION_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "Reduces all prices.",
	[Stat.Constitution]: "Increases hit points.",
	[Stat.Dexterity]:
		"Increases proficiency with certain weapons, armour class with light or medium armour and determines turn order.",
	[Stat.Intelligence]: "Increases damage of certain skills.",
	[Stat.Strength]: "Increases proficiency with certain weapons.",
	[Stat.Wisdom]: "Increases damage of certain skills.",
};

export const AUXILIARY_STATS_ABBR_MAP: Record<AuxiliaryStat, string> = {
	[AuxiliaryStat.ArmourClass]: "AC",
	[AuxiliaryStat.HitChance]: "HIT",
	[AuxiliaryStat.CritChance]: "CRT",
};

export const AUXILIARY_STATS_NAME_MAP: Record<AuxiliaryStat, string> = {
	[AuxiliaryStat.ArmourClass]: "Armour Class",
	[AuxiliaryStat.HitChance]: "Hit Chance",
	[AuxiliaryStat.CritChance]: "Crit Chance",
};

export const RESISTANCES_ABBR_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "SLA",
	[DamageType.Crushing]: "CRU",
	[DamageType.Piercing]: "PIE",
	[DamageType.Cold]: "CLD",
	[DamageType.Fire]: "FRE",
	[DamageType.Lightning]: "LTG",
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
	[DamageType.Lightning]: "Lightning",
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
	[DamageType.Lightning]: "#F9DC5C",
	[DamageType.Radiant]: "#F3FFBD",
	[DamageType.Necrotic]: "#5A0B4D",
	[DamageType.Poison]: "#157145",
	[DamageType.Acid]: "#A1EF8B",
};

export const AUXILIARY_EFFECTS_NAME_MAP: Record<AuxiliaryEffect, string> = {
	[AuxiliaryEffect.Poison]: "Poison",
	[AuxiliaryEffect.Stun]: "Stun",
	[AuxiliaryEffect.Bleed]: "Bleed",
	[AuxiliaryEffect.Disarm]: "Disarm",
	[AuxiliaryEffect.Silence]: "Silence",
	[AuxiliaryEffect.Blind]: "Blind",
	[AuxiliaryEffect.Frenzy]: "Frenzy",
	[AuxiliaryEffect.Charm]: "Charm",
	[AuxiliaryEffect.Haste]: "Haste",
	[AuxiliaryEffect.Cripple]: "Cripple",
	[AuxiliaryEffect.Bless]: "Bless",
	[AuxiliaryEffect.Curse]: "Curse",
};

export const AUXILIARY_EFFECTS_DESCRIPTION_MAP: Record<AuxiliaryEffect, string> = {
	[AuxiliaryEffect.Poison]: "Deals damage over time.",
	[AuxiliaryEffect.Stun]: "Prevents any action.",
	[AuxiliaryEffect.Bleed]: "Increases damage taken from physical attacks.",
	[AuxiliaryEffect.Disarm]: "Cannot use weapons.",
	[AuxiliaryEffect.Silence]: "Cannot use spells.",
	[AuxiliaryEffect.Blind]: "Decreases hit chance.",
	[AuxiliaryEffect.Frenzy]: "Increases damage dealt based on missing health.",
	[AuxiliaryEffect.Charm]: "Chance for attacks to hit user.",
	[AuxiliaryEffect.Haste]: "Always goes first.",
	[AuxiliaryEffect.Cripple]: "Always goes last.",
	[AuxiliaryEffect.Bless]: "Passes all saving throws.",
	[AuxiliaryEffect.Curse]: "Fails all saving throws.",
};

export const AUXILIARY_EFFECTS_NAME_MAP_PASSED: Record<AuxiliaryEffect, string> = {
	[AuxiliaryEffect.Poison]: "Poisoned",
	[AuxiliaryEffect.Stun]: "Stunned",
	[AuxiliaryEffect.Bleed]: "Bled",
	[AuxiliaryEffect.Disarm]: "Disarmed",
	[AuxiliaryEffect.Silence]: "Silenced",
	[AuxiliaryEffect.Blind]: "Blinded",
	[AuxiliaryEffect.Frenzy]: "Frenzied",
	[AuxiliaryEffect.Charm]: "Charmed",
	[AuxiliaryEffect.Haste]: "Hasted",
	[AuxiliaryEffect.Cripple]: "Crippled",
	[AuxiliaryEffect.Bless]: "Blessed",
	[AuxiliaryEffect.Curse]: "Cursed",
};

export const CLASS_NAME_MAP: Record<SkillClass, string> = {
	[SkillClass.Common]: "Common",
	[SkillClass.Unique]: "Unique",
	[SkillClass.Warrior]: "Warrior",
	[SkillClass.Mage]: "Mage",
	[SkillClass.Rogue]: "Rogue",
	[SkillClass.Cleric]: "Cleric",
	[SkillClass.Assassin]: "Assassin",
	[SkillClass.Warlock]: "Warlock",
	[SkillClass.Occultist]: "Occultist",
	[SkillClass.Barbarian]: "Barbarian",
};

export const SKILL_TYPE_NAME_MAP: Record<SkillType, string> = {
	[SkillType.WeaponAttack]: "Weapon Attack",
	[SkillType.Attack]: "Attack",
	[SkillType.Heal]: "Heal",
	[SkillType.Buff]: "Buff",
	[SkillType.Debuff]: "Debuff",
	[SkillType.Other]: "Other",
};

export const WEAPON_SIZE_NAME_MAP: Record<WeaponSize, string> = {
	[WeaponSize.OneHanded]: "One Handed",
	[WeaponSize.TwoHanded]: "Two Handed",
};

export const ARMOUR_TYPE_NAME_MAP: Record<ArmourType, string> = {
	[ArmourType.Heavy]: "Heavy",
	[ArmourType.Medium]: "Medium",
	[ArmourType.Light]: "Light",
	[ArmourType.Cloth]: "Cloth",
	[ArmourType.Miscellaneous]: "Misc",
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
	[WeaponType.Wand]: "Wand",
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

export const CHARACTER_STATUS_MAP: Record<Status, string> = {
	[Status.Alive]: "Alive",
	[Status.Dead]: "Dead",
	[Status.Retired]: "Retired",
	[Status.Complete]: "Won",
};

export const ACTION_TILES = [
	TileType.Merchant,
	TileType.Rest,
	TileType.Hut,
	TileType.Exit,
	TileType.Leaderboard,
	TileType.Salvage,
	TileType.Spirits,
];

export const ITEM_RARITY_COLOR_MAP: Record<ItemRarity, string> = {
	[ItemRarity.Common]: "#FFFFFF",
	[ItemRarity.Uncommon]: "#99E64C",
	[ItemRarity.Rare]: "#2F6BC6",
	[ItemRarity.Epic]: "#FF47DA",
	[ItemRarity.Legendary]: "#ff7800",
};

export const ITEM_RARITY_NAME_MAP: Record<ItemRarity, string> = {
	[ItemRarity.Common]: "Common",
	[ItemRarity.Uncommon]: "Uncommon",
	[ItemRarity.Rare]: "Rare",
	[ItemRarity.Epic]: "Epic",
	[ItemRarity.Legendary]: "Legendary",
};

// TODO: Move this to CMS
export const WEAPON_MODIFIER_MAP = new Map([
	[WeaponType.Axe, Stat.Strength],
	[WeaponType.Bow, Stat.Dexterity],
	[WeaponType.Club, Stat.Strength],
	[WeaponType.Crossbow, Stat.Dexterity],
	[WeaponType.Dagger, Stat.Dexterity],
	[WeaponType.Hammer, Stat.Strength],
	[WeaponType.Mace, Stat.Strength],
	[WeaponType.Spear, Stat.Strength],
	[WeaponType.Staff, Stat.Strength],
	[WeaponType.Sword, Stat.Strength],
	[WeaponType.Wand, Stat.Intelligence],
]);

export const CHARACTER_CLASSES = [
	CharacterClass.Fighter,
	CharacterClass.Mage,
	CharacterClass.Thief,
	CharacterClass.Priest,
	CharacterClass.Paladin,
	CharacterClass.Battlemage,
	CharacterClass.Shadowblade,
];

export const CHARACTER_CLASS_NAME_MAP: Record<CharacterClass, string> = {
	[CharacterClass.Fighter]: "Fighter",
	[CharacterClass.Mage]: "Mage",
	[CharacterClass.Thief]: "Thief",
	[CharacterClass.Priest]: "Priest",
	[CharacterClass.Paladin]: "Paladin",
	[CharacterClass.Battlemage]: "Battlemage",
	[CharacterClass.Shadowblade]: "Shadowblade",
};

export const REWARD_GOLD_MULTIPLIER = 10;
export const MAX_SKILLS = 7;
export const MAX_POTIONS = 3;
export const MAX_STAT_VALUE = 22;
export const FINAL_LEVEL = 100;

export * from "./config";
export * from "./quotes";
