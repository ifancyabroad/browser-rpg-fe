import { RoomState, RoomType } from "@common/utils";

export interface IRoom {
	state: RoomState;
	type: RoomType;
}

type TMapRow = IRoom[];

type TMap = TMapRow[];

export interface ILocation {
	level: number;
	x: number;
	y: number;
}

export interface IMap {
	maps: TMap[];
	location: ILocation;
}
