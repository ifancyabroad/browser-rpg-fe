import { ArmourType, EquipmentSlot, SkillClass, Stat, State, Status, WeaponType } from "common/utils";
import { IActiveEffect, IArmour, IEquipment, ISkill, IStatus, IWeapon, TDamageTypes, TStats } from "common/types";

export interface ICharacterClass {
	id: string;
	description: string;
	name: string;
	portrait: string;
	fallenImage: string;
	icon: string;
	skillClasses: SkillClass[];
	armourTypes: ArmourType[];
	weaponTypes: WeaponType[];
	skills: ISkill[];
	stats: TStats;
	equipment?: Partial<IEquipment>;
}

export interface ILevelUpData {
	level: number;
	skills: ISkill[];
}

export interface ICharacterPayload {
	name: string;
	characterClass: string;
}

export interface ICharacter {
	id: string;
	user: string;
	name: string;
	state: State;
	status: Status;
	level: number;
	skills: ISkill[];
	equipment: IEquipment;
	potions: number;
	hitPoints: number;
	maxHitPoints: number;
	stats: TStats;
	resistances: TDamageTypes;
	damageBonuses: TDamageTypes;
	activeStatusEffects: IStatus[];
	activeAuxiliaryEffects: IActiveEffect[];
	characterClass: ICharacterClass;
	experience: number;
	currentLevelExperience: number;
	nextLevelExperience: number | null;
	gold: number;
	discountMultiplier: number;
	maxBattleLevel: number;
	day: number;
	kills: number;
	armourClass: number;
	hitBonus: number;
	critBonus: number;
	availableItems: (IWeapon | IArmour)[];
	restockCount: number;
	restockPrice: number;
	restPrice: number;
	potionPrice: number;
	slainBy?: string;
	levelUpData?: ILevelUpData;
	baseHitPoints: number;
	baseMaxHitPoints: number;
	baseStats: TStats;
	baseResistances: TDamageTypes;
	equipmentAsArray: (IWeapon | IArmour)[];
	weaponsAsArray: IWeapon[];
	alive: boolean;
	goldValue: number;
	salvageValue: number;
	salvage: number;
}

export interface IBuyItemPayload {
	id: string;
	slot: EquipmentSlot;
}

export interface ILevelUpPayload {
	stat: Stat;
	skill?: string;
}

export interface IBuyPotionPayload {
	quantity: number;
}

export interface IProgressCharacter {
	id: string;
	name: string;
	level: number;
	kills: number;
	day: number;
	status: Status;
	maxBattleLevel: number;
	characterClass: ICharacterClass;
	slainBy?: string;
}

export interface IProgress {
	overallProgress: IProgressCharacter[];
	classProgress: IProgressCharacter[];
	rank: number | null;
	victories: number;
	kills: number;
	deaths: number;
	days: number;
}
