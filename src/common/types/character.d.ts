import { ArmourType, EquipmentSlot, SkillClass, State, Status, WeaponType } from "common/utils";
import { IArmour, IEquipment, ISkill, IWeapon, TDamageTypes, TEquipment, TStats } from "common/types";

export interface IHistory {
	enemy: string;
	level: number;
	day: number;
	defeated: boolean;
}

export interface ICharacterClass {
	id: string;
	description: string;
	name: string;
	portrait: string;
	skillClasses: SkillClass[];
	armourTypes: ArmourType[];
	weaponTypes: WeaponType[];
	skills: string[];
	stats: TStats;
	equipment?: Partial<TEquipment>;
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
	level: number;
	gold: number;
	day: number;
	skills: ISkill[];
	history: IHistory[];
	availableItems: (IWeapon | IArmour)[];
	equipment: IEquipment;
	hitPoints: number;
	maxHitPoints: number;
	stats: TStats;
	resistances: TDamageTypes;
}

export interface IBuyItemPayload {
	id: string;
	slot: EquipmentSlot;
}
