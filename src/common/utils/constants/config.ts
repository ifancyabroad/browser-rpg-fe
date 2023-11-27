import { AuxiliaryStat, DamageType, PropertyType, Stat } from "common/utils";

interface IPropertyConfig {
	key: string;
	abbr: string;
	name: string;
	colour?: string;
}

export const ATTRIBUTE_CONFIG: IPropertyConfig[] = [
	{
		key: Stat.Strength,
		abbr: "STR",
		name: "Strength",
	},
	{
		key: Stat.Dexterity,
		abbr: "DEX",
		name: "Dexterity",
	},
	{
		key: Stat.Constitution,
		abbr: "CON",
		name: "Constitution",
	},
	{
		key: Stat.Intelligence,
		abbr: "INT",
		name: "Intelligence",
	},
	{
		key: Stat.Wisdom,
		abbr: "WIS",
		name: "Wisdom",
	},
	{
		key: Stat.Charisma,
		abbr: "CHR",
		name: "Charisma",
	},
];

export const AUXILIARY_STAT_CONFIG: IPropertyConfig[] = [
	{
		key: AuxiliaryStat.Defence,
		abbr: "DEF",
		name: "Defence",
	},
	{
		key: AuxiliaryStat.HitChance,
		abbr: "HIT",
		name: "Hit Chance",
	},
	{
		key: AuxiliaryStat.CritChance,
		abbr: "CRT",
		name: "Crit Chance",
	},
	{
		key: AuxiliaryStat.HitPoints,
		abbr: "HPS",
		name: "Hit Points",
	},
];

export const RESISTANCE_CONFIG: IPropertyConfig[] = [
	{
		key: DamageType.Slashing,
		abbr: "SLA",
		name: "Slashing Resistance",
		colour: "#607466",
	},
	{
		key: DamageType.Crushing,
		abbr: "CRU",
		name: "Crushing Resistance",
		colour: "#6C6F7D",
	},
	{
		key: DamageType.Piercing,
		abbr: "PIE",
		name: "Piercing Resistance",
		colour: "#F2D1C9",
	},
	{
		key: DamageType.Cold,
		abbr: "CLD",
		name: "Cold Resistance",
		colour: "#92D5E6",
	},
	{
		key: DamageType.Fire,
		abbr: "FRE",
		name: "Fire Resistance",
		colour: "#E4572E",
	},
	{
		key: DamageType.Lightning,
		abbr: "LTG",
		name: "Lightning Resistance",
		colour: "#F9DC5C",
	},
	{
		key: DamageType.Radiant,
		abbr: "RAD",
		name: "Radiant Resistance",
		colour: "#F3FFBD",
	},
	{
		key: DamageType.Necrotic,
		abbr: "NEC",
		name: "Necrotic Resistance",
		colour: "#5A0B4D",
	},
	{
		key: DamageType.Poison,
		abbr: "PSN",
		name: "Poison Resistance",
		colour: "#157145",
	},
	{
		key: DamageType.Acid,
		abbr: "ACD",
		name: "Acid Resistance",
		colour: "#A1EF8B",
	},
];

export const DAMAGE_CONFIG: IPropertyConfig[] = [
	{
		key: DamageType.Slashing,
		abbr: "SLA",
		name: "Slashing Damage",
		colour: "#607466",
	},
	{
		key: DamageType.Crushing,
		abbr: "CRU",
		name: "Crushing Damage",
		colour: "#6C6F7D",
	},
	{
		key: DamageType.Piercing,
		abbr: "PIE",
		name: "Piercing Damage",
		colour: "#F2D1C9",
	},
	{
		key: DamageType.Cold,
		abbr: "CLD",
		name: "Cold Damage",
		colour: "#92D5E6",
	},
	{
		key: DamageType.Fire,
		abbr: "FRE",
		name: "Fire Damage",
		colour: "#E4572E",
	},
	{
		key: DamageType.Lightning,
		abbr: "LTG",
		name: "Lightning Damage",
		colour: "#F9DC5C",
	},
	{
		key: DamageType.Radiant,
		abbr: "RAD",
		name: "Radiant Damage",
		colour: "#F3FFBD",
	},
	{
		key: DamageType.Necrotic,
		abbr: "NEC",
		name: "Necrotic Damage",
		colour: "#5A0B4D",
	},
	{
		key: DamageType.Poison,
		abbr: "PSN",
		name: "Poison Damage",
		colour: "#157145",
	},
	{
		key: DamageType.Acid,
		abbr: "ACD",
		name: "Acid Damage",
		colour: "#A1EF8B",
	},
];

interface IPropertyTypeConfig {
	name: string;
	min: number;
	max: number;
	step: number;
	prefix: string;
	suffix: string;
	properties: IPropertyConfig[];
}

export const PROPERTY_CONFIG: Record<PropertyType, IPropertyTypeConfig> = {
	[PropertyType.Stat]: {
		name: "Stat",
		min: -10,
		max: 10,
		step: 1,
		prefix: "+",
		suffix: "",
		properties: ATTRIBUTE_CONFIG,
	},
	[PropertyType.AuxiliaryStat]: {
		name: "Auxiliary Stat",
		min: -100,
		max: 100,
		step: 5,
		prefix: "+",
		suffix: "%",
		properties: AUXILIARY_STAT_CONFIG,
	},
	[PropertyType.Resistance]: {
		name: "Resistance",
		min: -100,
		max: 100,
		step: 5,
		prefix: "+",
		suffix: "%",
		properties: RESISTANCE_CONFIG,
	},
	[PropertyType.Damage]: {
		name: "Damage",
		min: -100,
		max: 100,
		step: 5,
		prefix: "+",
		suffix: "%",
		properties: DAMAGE_CONFIG,
	},
};

export const PROPERTY_TYPES = [
	PropertyType.Stat,
	PropertyType.AuxiliaryStat,
	PropertyType.Resistance,
	PropertyType.Damage,
] as const;
