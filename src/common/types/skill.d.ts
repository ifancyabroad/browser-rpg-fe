import { SkillClass } from "common/utils";
import { ISkillEffect } from "./effect";

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
	remaining: number;
}
