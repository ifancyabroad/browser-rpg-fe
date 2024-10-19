import { BattleState, HitType, Target, Zone } from "common/utils";
import { ISkill } from "./skill";
import { IArmour, IEquipment, IWeapon } from "./equipment";
import { TDamageTypes, TStats } from "common/types";

export interface IEnemy {
	id: string;
	name: string;
	image: string;
	status: Status;
	level: number;
	skills: ISkill[];
	equipment: IEquipment;
	hitPoints: number;
	maxHitPoints: number;
	stats: TStats;
	resistances: TDamageTypes;
	activeStatusEffects: IStatus[];
	activeAuxiliaryEffects: IActiveEffect[];
	boss: boolean;
}

export interface IDamage {
	type: string;
	value: number;
	hitType: HitType;
	target: Target;
}

export interface IHeal {
	value: number;
	target: Target;
}

export interface IEffectSource {
	id: string;
	name: string;
	icon: string;
}

export interface IStatus {
	source: IEffectSource;
	target: Target;
	properties: TProperty[];
	remaining: number;
	duration: number;
	saved: boolean;
	modifier?: Stat;
	difficulty?: number;
}

export interface IAuxiliary {
	source: IEffectSource;
	target: Target;
	effect: AuxiliaryEffect;
	remaining: number;
	duration: number;
	saved: boolean;
	modifier?: Stat;
	difficulty?: number;
}

export interface IActiveEffect {
	effect: AuxiliaryEffect;
	remaining: number;
}

export interface IActionWeaponEffect {
	name: string;
	damage: IDamage[];
	status: IStatus[];
	auxiliary: IAuxiliary[];
}

export interface IActionSkillEffect {
	name: string;
	weaponDamage: IDamage[][];
	damage: IDamage[];
	heal: IHeal[];
	status: IStatus[];
	auxiliary: IAuxiliary[];
}

export interface IAction {
	self: string;
	enemy: string;
	skill: IActionSkillEffect;
	weapon: IActionWeaponEffect[];
	activeEffects: IActiveEffect[];
}

export interface IReward {
	gold: number;
	experience: number;
}

export interface IBattle {
	user: string;
	hero: string;
	enemy: IEnemy;
	turns: IAction[][];
	zone: Zone;
	state: BattleState;
	level: number;
	multiplier: number;
	result?: BattleResult;
	reward?: IReward;
	treasure?: (IWeapon | IArmour)[];
}

export interface IActionPayload {
	id: string;
}

export interface ITreasurePayload {
	id?: string;
	slot?: EquipmentSlot;
}
