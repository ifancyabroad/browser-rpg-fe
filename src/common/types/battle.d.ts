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

export interface IBattle {
	user: string;
	character: ICharacter;
	enemy: IEnemy;
	turns: ITurn[];
	state: BattleState;
}

export interface IActionPayload {
	id: string;
}
