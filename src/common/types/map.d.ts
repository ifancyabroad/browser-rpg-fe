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

export interface ITreasure {
	items: (IWeapon | IArmour)[];
	location: ILocation;
}

export interface IMap {
	maps: TMap[];
	location: ILocation;
	treasure: ITreasure[];
}
