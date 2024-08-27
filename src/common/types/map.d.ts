import { TileType } from "common/utils";

export interface ILocation {
	x: number;
	y: number;
}

export interface ITreasure {
	items: (IWeapon | IArmour)[];
	location: IMapLocation;
}

export interface ITileProperties {
	location: ILocation;
	type: TileType;
	blocking: boolean;
	active: boolean;
}
