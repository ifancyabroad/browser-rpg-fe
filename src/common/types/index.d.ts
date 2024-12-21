import { DamageType, EquipmentSlot, Stat } from "common/utils";

export type TStats = Record<Stat, number>;
export type TDamageTypes = Record<DamageType, number>;
export type TEquipment = Record<EquipmentSlot, string>;

export * from "./error";
export * from "./user";
export * from "./character";
export * from "./effect";
export * from "./property";
export * from "./battle";
export * from "./skill";
export * from "./equipment";
export * from "./map";
export * from "./level";
export * from "./leaderboard";
export * from "./contact";
export * from "./message";
