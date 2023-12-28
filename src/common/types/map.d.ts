import { RoomState, RoomType } from "@common/utils";

export interface ILocation {
	level: number;
	x: number;
	y: number;
}

export interface IRoom {
	state: RoomState;
	type: RoomType;
	location: ILocation;
}

type TMapRow = IRoom[];

type TMap = TMapRow[];

export interface IMap {
	maps: TMap[];
	location: ILocation;
}

export interface IPlayerLocation {
	top: number;
	left: number;
}

export interface IMove {
	location: ILocation;
	path: number[][];
}
