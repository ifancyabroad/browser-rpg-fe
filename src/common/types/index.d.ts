import { DamageType, EquipmentSlot, Stat } from "common/utils";

export type TStats = Record<Stat, number>;
export type TDamageTypes = Record<DamageType, number>;
export type TEquipment = Record<EquipmentSlot, string>;

export * from "./user";
export * from "./character";
export * from "./effect";
export * from "./property";
