import { Stat } from "common/utils";

export const STATS_ABBR_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "CHR",
	[Stat.Constitution]: "CON",
	[Stat.Dexterity]: "DEX",
	[Stat.Intelligence]: "INT",
	[Stat.Strength]: "STR",
	[Stat.Wisdom]: "WIS",
};

export const STATS_NAME_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "Charisma",
	[Stat.Constitution]: "Constitution",
	[Stat.Dexterity]: "Dexterity",
	[Stat.Intelligence]: "Intelligence",
	[Stat.Strength]: "Strength",
	[Stat.Wisdom]: "Wisdom",
};
