import { ArmourType, DamageType, EquipmentSlot, EquipmentType, WeaponSize, WeaponType } from "common/utils";
import { TProperty } from "./property";
import { IWeaponEffect } from "./effect";

export interface IArmour {
	id: string;
	type: EquipmentType;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	armourType?: ArmourType;
	armourClass?: number;
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
