import { ILocation, ITileProperties, IZone } from "common/types";
import Camera from "./Camera";
import Loader from "./Loader";
import { AStarFinder } from "astar-typescript";
import tilemap from "assets/images/tilemap/tilemap2.png";
import forestJSON from "assets/maps/forest.json";
import TiledMap, { TiledLayer, TiledTileset } from "tiled-types";
import { TileType } from "common/utils/enums";

interface IGame {
	run(): void;
	move(x: number, y: number): void;
	hover(x: number, y: number): void;
}

export class Game implements IGame {
	private _previousElapsed: number = 0;
	private _cursorLocation: ILocation | null = null;
	private _tileAtlas: HTMLImageElement | null = null;
	private _playerIcon: HTMLImageElement | null = null;
	private _playerLocation: ILocation;
	private _camera: Camera;
	private _maps: Record<string, TiledMap> = {};

	/**
	 * Constructor for the Game class.
	 *
	 * @param {IZone} _zone - The zone data for the game.
	 * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
	 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
	 */
	constructor(
		private _zone: IZone,
		public canvas: HTMLCanvasElement,
		public ctx: CanvasRenderingContext2D,
	) {
		this._camera = new Camera(
			this._playerLocation.x * this._activeMap.tilewidth,
			this._playerLocation.y * this._activeMap.tileheight,
			this.canvas.width,
			this.canvas.height,
		);
	}

	/**
	 * Returns the active map based on the player's current location.
	 *
	 * @return {TiledMap} The active map based on the player's current location.
	 */
	private get _activeMap(): TiledMap {
		return this._maps[this._zone.name];
	}

	/**
	 * Returns the tileset for the current map.
	 *
	 * @return {TiledTileset} The tileset for the game.
	 */
	private get _tileset(): TiledTileset {
		return this._activeMap.tilesets[0];
	}

	/**
	 * Returns the starting column index based on the camera's x position and map tile size.
	 *
	 * @return {number} The starting column index.
	 */
	private get _startCol(): number {
		return Math.floor(this._camera.x / this._activeMap.tilewidth);
	}

	/**
	 * Returns the ending column index based on the starting column, camera width, and map tile size.
	 *
	 * @return {number} The ending column index.
	 */
	private get _endCol(): number {
		return this._startCol + this._camera.width / this._activeMap.tilewidth;
	}

	/**
	 * Returns the starting row index based on the camera's y position and map tile size.
	 *
	 * @return {number} The starting row index.
	 */
	private get _startRow(): number {
		return Math.floor(this._camera.y / this._activeMap.tileheight);
	}

	/**
	 * Calculates the ending row index based on the starting row, camera height, and map tile size.
	 *
	 * @return {number} The ending row index.
	 */
	private get _endRow(): number {
		return this._startRow + this._camera.height / this._activeMap.tileheight;
	}

	/**
	 * Calculates the x-axis offset based on the camera's x position, the starting column, and the map tile size.
	 *
	 * @return {number} The calculated x-axis offset.
	 */
	private get _offsetX(): number {
		return -this._camera.x + this._startCol * this._activeMap.tilewidth;
	}

	/**
	 * Calculates the y-axis offset based on the camera's y position, the starting row, and the map tile size.
	 *
	 * @return {number} The calculated y-axis offset.
	 */
	private get _offsetY(): number {
		return -this._camera.y + this._startRow * this._activeMap.tileheight;
	}

	/**
	 * Loads necessary assets for the game, such as images, and returns a Promise array of the loaded images.
	 *
	 * @return {Promise<HTMLImageElement>[]} An array of Promises that resolve with the loaded images.
	 */
	private loadImages(): Promise<HTMLImageElement>[] {
		return [Loader.loadImage("tiles", tilemap), Loader.loadImage("player", this._player.icon)];
	}

	/**
	 * Loads necessary maps for the game and returns a Promise array of the loaded maps.
	 *
	 * @return {Promise<TiledMap>[]} An array of Promises that resolve with the loaded maps.
	 */
	private loadMaps(): Promise<TiledMap>[] {
		return [Loader.loadMap(this._zone.name, forestJSON)];
	}

	/**
	 * Initializes the tileAtlas and playerIcon for the game.
	 */
	private init() {
		this._tileAtlas = Loader.getImage("tiles");
		this._playerIcon = Loader.getImage("player");
		this._maps = Loader.getMaps();
	}

	/**
	 * Update the game state based on the delta time.
	 *
	 * @param {number} delta - The time elapsed since the last update.
	 */
	private update(delta: number) {}

	/**
	 * Retrieves the tile located at the specified column and row coordinates.
	 *
	 * @param {TiledLayer} layer - The layer to retrieve the tile from.
	 * @param {number} col - The column index of the tile.
	 * @param {number} row - The row index of the tile.
	 * @return {number | undefined} The tile object at the given coordinates.
	 */
	private _getTile(layer: TiledLayer, col: number, row: number): number | undefined {
		if ("data" in layer) {
			const idx = col + row * layer.width;
			const tile = layer.data[idx];
			return tile as number;
		}
	}

	/**
	 * Retrieves the map location based on the provided x and y coordinates.
	 *
	 * @param {number} x - The x coordinate for the location.
	 * @param {number} y - The y coordinate for the location.
	 * @return {ITileProperties} The tile properties at the specified coordinates.
	 */
	private _getTileProperties(x: number, y: number): ITileProperties {
		const col = Math.floor((x - this._offsetX) / this._activeMap.tilewidth) + this._startCol;
		const row = Math.floor((y - this._offsetY) / this._activeMap.tileheight) + this._startRow;

		const properties: ITileProperties = {
			location: { x: col, y: row },
			active: false,
			blocking: false,
			type: TileType.None,
		};

		if (!this._tileset.tiles) {
			return properties;
		}

		const tiles = this._tileset.tiles;
		const tileProperties = this._activeMap.layers.flatMap((layer) => {
			const id = this._getTile(layer, col, row);
			const tile = tiles.find((t) => t.id === id);
			return tile?.properties ?? [];
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
	 * Finds a path from the current player position to the given destination location using A* pathfinding algorithm.
	 * Incredibly inefficient, use sparingly.
	 *
	 * @param {ILocation} destination - The destination location to find a path to.
	 * @return {number[][]} - An array of locations representing the path from start to end.
	 */
	private _findPath(destination: ILocation): number[][] {
		const matrix: number[][] = [];
		for (let y = 0; y < this._activeMap.height; y++) {
			matrix[y] = [];
			for (let x = 0; x < this._activeMap.width; x++) {
				const properties = this._getTileProperties(x, y);
				matrix[y][x] = properties.blocking ? 1 : 0;
			}
		}
		const aStarInstance = new AStarFinder({
			grid: { matrix },
			diagonalAllowed: false,
		});
		const startPos = { x: this._playerLocation.x, y: this._playerLocation.y };
		const goalPos = { x: destination.x, y: destination.y };
		return aStarInstance.findPath(startPos, goalPos);
	}

	/**
	 * Draws a tile on the canvas at the specified coordinates.
	 *
	 * @param {number} globalID - The global ID of the tile to draw.
	 * @param {number} x - The x-coordinate for the tile.
	 * @param {number} y - The y-coordinate for the tile.
	 */
	private _drawTile(globalID: number, x: number, y: number) {
		if (!this._tileAtlas) {
			return;
		}

		const tilesetX = (globalID % this._tileset.columns) * this._tileset.tilewidth;
		const tilesetY = Math.floor(globalID / this._tileset.columns) * this._tileset.tileheight;

		this.ctx.drawImage(
			this._tileAtlas, // image
			tilesetX * this._activeMap.tilewidth, // source x
			tilesetY * this._activeMap.tileheight, // source y
			this._activeMap.tilewidth, // source width
			this._activeMap.tileheight, // source height
			Math.round(x), // target x
			Math.round(y), // target y
			this._activeMap.tilewidth, // target width
			this._activeMap.tileheight, // target height
		);
	}

	/**
	 * Draws the visible portion of the game map layer on the canvas based on the camera position.
	 *
	 */
	private _drawLayers() {
		for (const layer of this._activeMap.layers) {
			for (let r = this._startRow; r <= this._endRow; r++) {
				for (let c = this._startCol; c <= this._endCol; c++) {
					const tile = this._getTile(layer, c, r);
					const x = (c - this._startCol) * this._activeMap.tilewidth + this._offsetX;
					const y = (r - this._startRow) * this._activeMap.tileheight + this._offsetY;
					if (tile) {
						this._drawTile(tile, x, y);
					}
				}
			}
		}
	}

	/**
	 * Draws the player icon on the canvas at the specified location.
	 *
	 * @return {void} Does not return anything.
	 */
	private _drawPlayer(): void {
		if (!this._playerIcon) {
			return;
		}

		this.ctx.drawImage(
			this._playerIcon, // image
			(this._playerLocation.x - this._startCol) * this._activeMap.tilewidth + this._offsetX, // destination x
			(this._playerLocation.y - this._startRow) * this._activeMap.tileheight + this._offsetY, // destination y
			this._activeMap.tilewidth, // destination width
			this._activeMap.tileheight, // destination height
		);
	}

	/**
	 * Draws the cursor on the canvas at the specified location.
	 * The cursor is drawn as a yellow box.
	 *
	 * @returns {void} Does not return anything.
	 */
	private drawCursor(): void {
		if (!this._cursorLocation) {
			return;
		}

		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "#fce94f";

		const startX = (this._cursorLocation.x - this._startCol) * this._activeMap.tilewidth + this._offsetX;
		const startY = (this._cursorLocation.y - this._startRow) * this._activeMap.tileheight + this._offsetY;
		const length = this._activeMap.tileheight / 4;
		const gap = this._activeMap.tileheight / 2;

		this.ctx.beginPath();
		this.ctx.moveTo(startX, startY);
		this.ctx.lineTo(startX + length, startY);
		this.ctx.moveTo(startX + length + gap, startY);
		this.ctx.lineTo(startX + length + gap + length, startY);
		this.ctx.lineTo(startX + length + gap + length, startY + length);
		this.ctx.moveTo(startX + length + gap + length, startY + length + gap);
		this.ctx.lineTo(startX + length + gap + length, startY + length + gap + length);
		this.ctx.lineTo(startX + length + gap, startY + length + gap + length);
		this.ctx.moveTo(startX + length, startY + length + gap + length);
		this.ctx.lineTo(startX, startY + length + gap + length);
		this.ctx.lineTo(startX, startY + length + gap);
		this.ctx.moveTo(startX, startY + length);
		this.ctx.lineTo(startX, startY);
		this.ctx.stroke();
	}

	/**
	 * Renders the game by drawing the layer.
	 *
	 */
	public render() {
		// draw dungeon
		this._drawLayers();

		// draw player
		this._drawPlayer();

		// draw cursor
		this.drawCursor();
	}

	/**
	 * Initializes the game loop by loading necessary assets and rendering the initial frame.
	 * Calls the load function to load assets, then renders the initial frame once assets are loaded.
	 */
	public run() {
		this._previousElapsed = 0;

		const p = [...this.loadImages(), ...this.loadMaps()];
		Promise.all(p).then(() => {
			this.init();
			window.requestAnimationFrame(this.tick.bind(this));
		});
	}

	/**
	 * Update the game state based on the elapsed time.
	 *
	 * @param {number} elapsed - The elapsed time since the last update in milliseconds.
	 */
	public tick(elapsed: number) {
		if (!this.ctx) {
			return;
		}

		window.requestAnimationFrame(this.tick.bind(this));

		// clear previous frame
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// compute delta time in seconds -- also cap it
		let delta = (elapsed - this._previousElapsed) / 1000.0;
		delta = Math.min(delta, 0.25); // maximum delta of 250 ms
		this._previousElapsed = elapsed;

		this.update(delta);
		this.render();
	}

	/**
	 * Move the player to a new location based on the provided coordinates.
	 *
	 * @param {number} x - The x-coordinate of the new location.
	 * @param {number} y - The y-coordinate of the new location.
	 * @return {ITileProperties | undefined} The room at the new location or undefined if no room is found.
	 */
	public move(x: number, y: number): ITileProperties | undefined {
		const properties = this._getTileProperties(x, y);

		if (properties.type === TileType.None || properties.blocking) {
			return;
		}

		if (!this._findPath(properties.location).length) {
			return;
		}

		this._playerLocation = properties.location;
		this._camera.move(
			this._playerLocation.x * this._activeMap.tilewidth,
			this._playerLocation.y * this._activeMap.tileheight,
		);

		return properties;
	}

	/**
	 * Highlights the room that the player can move to based on the provided coordinates.
	 *
	 * @param {number} x - The x-coordinate of the location to highlight.
	 * @param {number} y - The y-coordinate of the location to highlight.
	 */
	public hover(x: number, y: number) {
		const properties = this._getTileProperties(x, y);

		if (properties.type === TileType.None || properties.blocking) {
			this._cursorLocation = null;
			this.canvas.style.cursor = "default";
			return;
		}

		this._cursorLocation = properties.location;
		this.canvas.style.cursor = "pointer";
	}

	public setData(zone: IZone) {
		this._zone = zone;
		this._camera.move(
			this._playerLocation.x * this._activeMap.tilewidth,
			this._playerLocation.y * this._activeMap.tileheight,
		);
	}
}
