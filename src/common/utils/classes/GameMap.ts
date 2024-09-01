import { ILocation, ITileProperties } from "common/types";
import { TileType } from "common/utils/enums";
import TiledMap, { TiledLayer, TiledProperty, TiledTileset } from "tiled-types";

interface IGameMap {
	get map(): ITileProperties[][];
	get startingLocation(): ILocation;
	getTile(col: number, row: number): ITileProperties | undefined;
}

export class GameMap implements IGameMap {
	private _tiledMap: TiledMap;
	private _tileset: TiledTileset;
	private _map: ITileProperties[][];

	/**
	 * Creates an instance of GameMap.
	 * @param {TiledMap} tiledMap - The tiled map object.
	 */
	constructor(tiledMap: TiledMap) {
		this._tiledMap = tiledMap;
		this._tileset = tiledMap.tilesets[0];
		this._map = this._getTiledMapProperties();
	}

	/**
	 * Gets the map properties.
	 * @returns {ITileProperties[][]} The map properties.
	 */
	get map(): ITileProperties[][] {
		return this._map;
	}

	/**
	 * Gets the starting location on the map.
	 * @returns {ILocation} The starting location.
	 */
	get startingLocation(): ILocation {
		const location = this.map.flatMap((row) => row).find((p) => p.type === TileType.Entrance);
		return location ? location.location : { x: 0, y: 0 };
	}

	/**
	 * Retrieves the tile properties at the specified column and row.
	 * @param {number} col - The column index of the tile.
	 * @param {number} row - The row index of the tile.
	 * @returns {ITileProperties | undefined} The tile properties or undefined if not found.
	 */
	public getTile(col: number, row: number): ITileProperties | undefined {
		return this._map[row]?.[col];
	}

	/**
	 * Retrieves the tile located at the specified column and row coordinates.
	 *
	 * @param {TiledLayer} layer - The layer to retrieve the tile from.
	 * @param {number} col - The column index of the tile.
	 * @param {number} row - The row index of the tile.
	 * @return {number | undefined} The tile object at the given coordinates.
	 */
	private _getTileGlobalID(layer: TiledLayer, col: number, row: number): number | undefined {
		if ("data" in layer) {
			// TODO: Refactor this
			const data = layer.data as number[];
			const result = data.reduce((resultArray, item, index) => {
				const chunkIndex = Math.floor(index / layer.width);

				if (!resultArray[chunkIndex]) {
					resultArray[chunkIndex] = []; // start a new chunk
				}

				resultArray[chunkIndex].push(item);

				return resultArray;
			}, [] as number[][]);
			const tile = result[row]?.[col];
			return tile as number;
		}

		if ("objects" in layer) {
			const obj = layer.objects.find((o) => {
				const x = Math.floor(o.x / this._tiledMap.tilewidth);
				const y = Math.floor((o.y - o.height) / this._tiledMap.tileheight);
				return x === col && y === row;
			});

			if (!obj?.gid) {
				return;
			}

			return obj.gid - 1;
		}
	}

	/**
	 * Retrieves the tile properties based on the provided location.
	 *
	 * @param {ILocation} location - The location object with x and y properties representing the column and row respectively.
	 * @return {ITileProperties} The tile properties at the specified coordinates.
	 */
	private _getTileProperties(location: ILocation): ITileProperties {
		const { x, y } = location;

		const properties: ITileProperties = {
			globalIDs: [],
			location: { x, y },
			active: false,
			blocking: false,
			type: TileType.None,
		};

		if (!this._tileset.tiles) {
			return properties;
		}

		const tiles = this._tileset.tiles;
		const tileProperties: TiledProperty[] = [];

		this._tiledMap.layers.forEach((layer) => {
			const id = this._getTileGlobalID(layer, x, y);
			if (id) {
				properties.globalIDs.push(id);
			}
			const tile = tiles.find((t) => t.id === id);
			if (tile && tile.properties) {
				tileProperties.push(...tile.properties);
			}
		});

		if (!tileProperties.length) {
			return properties;
		}

		const type = tileProperties.find((p) => p.name === "type");
		if (type) {
			properties.type = type.value as TileType;
		}

		properties.active = tileProperties.some((p) => p.name === "active" && p.value === true);
		properties.blocking = tileProperties.some((p) => p.name === "blocking" && p.value === true);

		return properties;
	}

	/**
	 * Retrieves the properties of each tile in the tiled map.
	 *
	 * @returns {ITileProperties[][]} An array of tile properties, where each element represents a row of tiles.
	 *          Each row contains an array of tile properties for each tile in that row.
	 */
	private _getTiledMapProperties(): ITileProperties[][] {
		const properties: ITileProperties[][] = [];
		for (let y = 0; y < this._tiledMap.height; y++) {
			properties[y] = [];
			for (let x = 0; x < this._tiledMap.width; x++) {
				properties[y][x] = this._getTileProperties({ x, y });
			}
		}
		return properties;
	}
}
