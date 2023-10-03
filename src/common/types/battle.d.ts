import { BattleState } from "common/utils";
import { ICharacter } from "./character";
import { ISkill } from "./skill";
import { IEquipment } from "./equipment";

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
	stats: IStats;
	resistances: IResistances;
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

export interface IAction {
	weaponDamage: IDamage[][];
	damage: IDamage[];
	heal: IHeal[];
	status: any[];
	auxiliary: any[];
}

export interface IReward {
	gold: number;
	experience: number;
}

export interface IBattle {
	user: string;
	character: ICharacter;
	enemy: IEnemy;
	turns: IAction[][];
	state: BattleState;
	reward?: IReward;
}

export interface IActionPayload {
	id: string;
}
