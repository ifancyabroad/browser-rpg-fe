import { ArmourType, EquipmentSlot, SkillClass, Stat, State, Status, WeaponType } from "common/utils";
import {
	IActiveEffect,
	IArmour,
	IEquipment,
	ILocation,
	IMap,
	ISkill,
	IStatus,
	IWeapon,
	TDamageTypes,
	TStats,
} from "common/types";

export interface ICharacterClass {
	id: string;
	description: string;
	name: string;
	portrait: string;
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
	characterClass: ICharacterClass;
	status: Status;
	state: State;
	experience: number;
	nextLevelExperience: number;
	level: number;
	gold: number;
	day: number;
	kills: number;
	slainBy?: string;
	skills: ISkill[];
	availableItems: (IWeapon | IArmour)[];
	equipment: IEquipment;
	hitPoints: number;
	maxHitPoints: number;
	stats: TStats;
	resistances: TDamageTypes;
	activeStatusEffects: IStatus[];
	activeAuxiliaryEffects: IActiveEffect[];
	levelUpData?: ILevelUpData;
	armourClass: number;
	hitBonus: number;
	critBonus: number;
	restPrice: number;
	map: IMap;
}

export interface IBuyItemPayload {
	id: string;
	slot: EquipmentSlot;
}

export interface ILevelUpPayload {
	stat: Stat;
	skill?: string;
}

export interface IMovePayload {
	location: ILocation;
}
