import { TileType } from "common/utils";
import { TiledProperty } from "tiled-types";

export interface ILocation {
	x: number;
	y: number;
}

export interface ITileProperties {
	globalIDs: number[];
	location: ILocation;
	type: TileType;
	blocking: boolean;
	active: boolean;
}

export interface ITileLayerTileProperties {
	globalID: number;
	properties: TiledProperty[];
}
