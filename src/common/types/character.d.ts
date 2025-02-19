import { ArmourType, AuxiliaryEffect, EquipmentSlot, SkillClass, Stat, State, Status, WeaponType } from "common/utils";
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

export interface ISalvage {
	value: number;
	claimed: boolean;
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
	salvage: ISalvage;
	auxiliaryEffects: Record<AuxiliaryEffect, boolean>;
	spiritsDisabled: boolean;
	disableSpiritsPrice: number;
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

export interface IDailyWinner {
	id: string;
	username: string;
	name: string;
	characterClass: string;
	maxBattleLevel: number;
}
