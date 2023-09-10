import { ArmourType, SkillClass, State, Status, WeaponType } from "common/utils";

export interface ISkill {
	skill: string;
	remaining: number;
}

export interface IHistory {
	enemy: string;
	level: number;
	day: number;
	defeated: boolean;
}

export interface IStats {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
}

export interface IEquipment {
	head: string | null;
	neck: string | null;
	body: string | null;
	waist: string | null;
	hands: string | null;
	feet: string | null;
	finger1: string | null;
	finger2: string | null;
	hand1: string | null;
	hand2: string | null;
}

export interface ICharacter {
	id: string;
	user: string;
	name: string;
	characterClass: string;
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
	stats: IStats;
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
