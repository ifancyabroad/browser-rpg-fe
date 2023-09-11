import {
	ArmourType,
	DamageType,
	EquipmentSlot,
	EquipmentType,
	SkillClass,
	State,
	Status,
	WeaponSize,
	WeaponType,
} from "common/utils";
import { ISkillEffect, IWeaponEffect } from "./effect";
import { TProperty } from "./property";
import { TEquipment, TStats } from ".";

export interface IArmour {
	id: string;
	type: EquipmentType;
	armourType: ArmourType;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	defense: number;
	properties?: TProperty[];
}

export interface IWeapon {
	id: string;
	type: EquipmentType.Weapon;
	weaponType: WeaponType;
	size: WeaponSize;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	damageType: DamageType;
	min: number;
	max: number;
	effects?: IWeaponEffect[];
	properties?: TProperty[];
}

export interface ISkill {
	id: string;
	class: SkillClass;
	name: string;
	description: string;
	icon: string;
	effects: ISkillEffect[];
	price: number;
	maxUses: number;
	level: number;
}

export interface IHistory {
	enemy: string;
	level: number;
	day: number;
	defeated: boolean;
}

export interface IEquipment {
	[EquipmentSlot.Head]: IArmour | null;
	[EquipmentSlot.Neck]: IArmour | null;
	[EquipmentSlot.Body]: IArmour | null;
	[EquipmentSlot.Waist]: IArmour | null;
	[EquipmentSlot.Hands]: IArmour | null;
	[EquipmentSlot.Feet]: IArmour | null;
	[EquipmentSlot.Finger1]: IArmour | null;
	[EquipmentSlot.Finger2]: IArmour | null;
	[EquipmentSlot.Hand1]: IWeapon | null;
	[EquipmentSlot.Hand2]: IWeapon | IArmour | null;
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
	equipment: IEquipment;
	hitPoints: number;
	maxHitPoints: number;
	stats: TStats;
}
