import { ArmourType, EquipmentSlot, SkillClass, Stat, State, Status, WeaponType, Zone } from "common/utils";
import { IActiveEffect, IArmour, IEquipment, ISkill, IStatus, IWeapon, TDamageTypes, TStats } from "common/types";

export interface ICharacterClass {
	id: string;
	description: string;
	name: string;
	portrait: string;
	icon: string;
	skillClasses: SkillClass[];
	armourTypes: ArmourType[];
	weaponTypes: WeaponType[];
	skills: ISkill[];
	stats: TStats;
	equipment?: Partial<IEquipment>;
}

export interface IZone {
	name: Zone;
	level: number;
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
	nextLevelExperience: number;
	gold: number;
	goldMultiplier: number;
	discountMultiplier: number;
	day: number;
	kills: number;
	armourClass: number;
	hitBonus: number;
	critBonus: number;
	availableItems: (IWeapon | IArmour)[];
	slainBy?: string;
	levelUpData?: ILevelUpData;
	zone: IZone;
	baseHitPoints: number;
	baseMaxHitPoints: number;
	baseStats: TStats;
	baseResistances: TDamageTypes;
	equipmentAsArray: (IWeapon | IArmour)[];
	weaponsAsArray: IWeapon[];
}

export interface IBuyItemPayload {
	id: string;
	slot: EquipmentSlot;
}

export interface ITreasurePayload {
	id?: string;
	slot?: EquipmentSlot;
	zone: IZone;
}

export interface ILevelUpPayload {
	stat: Stat;
	skill?: string;
}
