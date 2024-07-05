import { RoomType } from "common/utils";
import { ILocation } from "./map";

export interface ILevel {
	name: string;
	tileLocationMap: Record<RoomType, ILocation>;
	spriteLocationMap: Record<RoomType, ILocation | null>;
}
