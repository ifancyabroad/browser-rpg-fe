import { RoomState, RoomType } from "@common/utils";

export interface ILocation {
	x: number;
	y: number;
}

export interface IMapLocation extends ILocation {
	level: number;
}

export interface IMapLocation {
	level: number;
	x: number;
	y: number;
}

export interface IRoom {
	state: RoomState;
	type: RoomType;
	location: IMapLocation;
	tile: ILocation;
}

type TMapRow = IRoom[];

type TMap = TMapRow[];

export interface ITreasure {
	items: (IWeapon | IArmour)[];
	location: IMapLocation;
}

export interface IMap {
	maps: TMap[];
	location: IMapLocation;
	treasure: ITreasure[];
}

export interface IMapData {
	cols: number;
	rows: number;
	tsize: number;
	map: TMap;
}

export interface IPlayerData {
	icon: string;
	location: ILocation;
}
