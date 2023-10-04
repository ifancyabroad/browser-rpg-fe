import { ArmourType, EquipmentSlot, SkillClass, State, Status, WeaponType } from "common/utils";
import { IArmour, IEquipment, ISkill, IWeapon, TDamageTypes, TEquipment, TStats } from "common/types";

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
	kills: number;
	slainBy?: string;
	skills: ISkill[];
	availableItems: (IWeapon | IArmour)[];
	equipment: IEquipment;
	hitPoints: number;
	maxHitPoints: number;
	stats: TStats;
	resistances: TDamageTypes;
	activeEffects: ISkill[];
}

export interface IBuyItemPayload {
	id: string;
	slot: EquipmentSlot;
}
