import { ICharacter, ILocation, ITileProperties } from "common/types";
import Camera from "./Camera";
import Loader from "./Loader";
import { GameMap } from "./GameMap";
import { AStarFinder } from "astar-typescript";
import tilemap from "assets/images/tilemap/tilemap.png";
import forestJSON from "assets/maps/forest.json";
import TiledMap, { TiledTileset } from "tiled-types";
import { decodeMap } from "common/utils/helpers";
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
	private _tiledMap: TiledMap;
	private _map: GameMap;
	private _location: ILocation;
	private _camera: Camera;

	/**
	 * Constructor for the Game class.
	 *
	 * @param {ICharacter} hero - The character class for the player.
	 * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
	 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
	 */
	constructor(
		public hero: ICharacter,
		public canvas: HTMLCanvasElement,
		public ctx: CanvasRenderingContext2D,
	) {
		this._tiledMap = decodeMap(forestJSON as unknown as TiledMap);

		this._map = new GameMap(this._tiledMap);

		this._location = this._map.startingLocation;

		this._camera = new Camera(
			this._location.x * this._tiledMap.tilewidth,
			this._location.y * this._tiledMap.tileheight,
			this.canvas.width,
			this.canvas.height,
		);
	}

	/**
	 * Returns the tileset for the current map.
	 *
	 * @return {TiledTileset} The tileset for the game.
	 */
	private get _tileset(): TiledTileset {
		return this._tiledMap.tilesets[0];
	}

	/**
	 * Returns the starting column index based on the camera's x position and map tile size.
	 *
	 * @return {number} The starting column index.
	 */
	private get _startCol(): number {
		return Math.floor(this._camera.x / this._tiledMap.tilewidth);
	}

	/**
	 * Returns the ending column index based on the starting column, camera width, and map tile size.
	 *
	 * @return {number} The ending column index.
	 */
	private get _endCol(): number {
		return this._startCol + this._camera.width / this._tiledMap.tilewidth;
	}

	/**
	 * Returns the starting row index based on the camera's y position and map tile size.
	 *
	 * @return {number} The starting row index.
	 */
	private get _startRow(): number {
		return Math.floor(this._camera.y / this._tiledMap.tileheight);
	}

	/**
	 * Calculates the ending row index based on the starting row, camera height, and map tile size.
	 *
	 * @return {number} The ending row index.
	 */
	private get _endRow(): number {
		return this._startRow + this._camera.height / this._tiledMap.tileheight;
	}

	/**
	 * Calculates the x-axis offset based on the camera's x position, the starting column, and the map tile size.
	 *
	 * @return {number} The calculated x-axis offset.
	 */
	private get _offsetX(): number {
		return -this._camera.x + this._startCol * this._tiledMap.tilewidth;
	}

	/**
	 * Calculates the y-axis offset based on the camera's y position, the starting row, and the map tile size.
	 *
	 * @return {number} The calculated y-axis offset.
	 */
	private get _offsetY(): number {
		return -this._camera.y + this._startRow * this._tiledMap.tileheight;
	}

	/**
	 * Loads necessary assets for the game, such as images, and returns a Promise array of the loaded images.
	 *
	 * @return {Promise<HTMLImageElement>[]} An array of Promises that resolve with the loaded images.
	 */
	private loadImages(): Promise<HTMLImageElement>[] {
		return [Loader.loadImage("tiles", tilemap)];
	}

	/**
	 * Initializes the images for the game.
	 */
	private init() {
		this._tileAtlas = Loader.getImage("tiles");
	}

	/**
	 * Update the game state based on the delta time.
	 *
	 * @param {number} delta - The time elapsed since the last update.
	 */
	private update(delta: number) {}

	/**
	 * Retrieves the location based on the given coordinates.
	 *
	 * @param x - The x-coordinate.
	 * @param y - The y-coordinate.
	 * @returns The location object with x and y properties representing the column and row respectively.
	 */
	private _getLocationByCoordinates(x: number, y: number): ILocation {
		const col = Math.floor((x - this._offsetX) / this._tiledMap.tilewidth) + this._startCol;
		const row = Math.floor((y - this._offsetY) / this._tiledMap.tileheight) + this._startRow;

		return { x: col, y: row };
	}

	/**
	 * Retrieves the location of a tile in the tileset based on its global ID.
	 *
	 * @param globalID - The global ID of the tile.
	 * @returns The location of the tile in the tileset.
	 */
	private _getTilesetLocationByGlobalID(globalID: number): ILocation {
		const tilesetX = globalID % this._tileset.columns;
		const tilesetY = Math.floor(globalID / this._tileset.columns);

		return { x: tilesetX, y: tilesetY };
	}

	/**
	 * Retrieves the global ID of a tile based on its type and active status.
	 *
	 * @param type - The type of the tile to search for.
	 * @param active - The active status of the tile to search for.
	 * @returns The global ID of the tile if found, otherwise `undefined`.
	 */
	private _getTileGlobalID(type: TileType, active: boolean): number | undefined {
		if (!this._tileset.tiles) {
			return;
		}

		return this._tileset.tiles.find(
			(t) =>
				t.properties?.find((p) => p.name === "type" && p.value === type) &&
				t.properties?.find((p) => p.name === "active" && p.value === active),
		)?.id;
	}

	/**
	 * Retrieves the global ID of a tile based on the given property.
	 *
	 * @param className - The name of the class to search for.
	 * @returns The global ID of the tile if found, otherwise undefined.
	 */
	private _getHeroGlobalID(className: string): number | undefined {
		if (!this._tileset.tiles) {
			return;
		}
		return this._tileset.tiles.find((t) => t.properties?.find((p) => p.name === "class" && p.value === className))
			?.id;
	}

	/**
	 * Finds a path from the current player position to the given destination location using A* pathfinding algorithm.
	 * Incredibly inefficient, use sparingly.
	 *
	 * @param {ILocation} destination - The destination location to find a path to.
	 * @param {boolean} includeEndNode - Whether to include the end node in the path.
	 * @return {number[][]} - An array of locations representing the path from start to end.
	 */
	private _findPath(destination: ILocation, includeEndNode = true): number[][] {
		const matrix = this._map.map.map((row) => row.map((p) => (p.blocking ? 1 : 0)));
		const aStarInstance = new AStarFinder({
			grid: { matrix },
			diagonalAllowed: false,
			includeEndNode,
		});
		const startPos = { x: this._location.x, y: this._location.y };
		const goalPos = { x: destination.x, y: destination.y };
		return aStarInstance.findPath(startPos, goalPos);
	}

	/**
	 * Draws a tile on the canvas at the specified coordinates.
	 *
	 * @param {ITileProperties} tileProperties - The properties of the tile to draw.
	 * @param {number} x - The x-coordinate for the tile.
	 * @param {number} y - The y-coordinate for the tile.
	 */
	private _drawTile(tileProperties: ITileProperties, x: number, y: number) {
		if (!this._tileAtlas) {
			return;
		}

		const tileAtlas = this._tileAtlas;

		tileProperties.globalIDs.forEach((globalID) => {
			let id = globalID;

			if (tileProperties.active) {
				const inactiveID = this._getTileGlobalID(tileProperties.type, false);
				const activeID = this._getTileGlobalID(tileProperties.type, true);
				if (activeID && id === inactiveID) {
					id = activeID;
				}
			}

			const tilesetLocation = this._getTilesetLocationByGlobalID(id);

			this.ctx.drawImage(
				tileAtlas, // image
				tilesetLocation.x * this._tiledMap.tilewidth, // source x
				tilesetLocation.y * this._tiledMap.tileheight, // source y
				this._tiledMap.tilewidth, // source width
				this._tiledMap.tileheight, // source height
				Math.round(x), // target x
				Math.round(y), // target y
				this._tiledMap.tilewidth, // target width
				this._tiledMap.tileheight, // target height
			);
		});
	}

	/**
	 * Draws the visible portion of the game map layer on the canvas based on the camera position.
	 */
	private _drawLayers() {
		for (let r = this._startRow; r <= this._endRow; r++) {
			for (let c = this._startCol; c <= this._endCol; c++) {
				const tile = this._map.getTile(c, r);
				const x = (c - this._startCol) * this._tiledMap.tilewidth + this._offsetX;
				const y = (r - this._startRow) * this._tiledMap.tileheight + this._offsetY;

				if (tile) {
					this._drawTile(tile, x, y);
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
		if (!this._tileAtlas) {
			return;
		}

		const globalID = this._getHeroGlobalID(this.hero.characterClass.name);

		if (!globalID) {
			return;
		}

		const tilesetLocation = this._getTilesetLocationByGlobalID(globalID);

		if (Math.floor(Date.now() / 400) % 2 === 0) {
			this.ctx.drawImage(
				this._tileAtlas, // image
				tilesetLocation.x * this._tiledMap.tilewidth, // source x
				tilesetLocation.y * this._tiledMap.tileheight, // source y
				this._tiledMap.tilewidth, // source width
				this._tiledMap.tileheight, // source height
				(this._location.x - this._startCol) * this._tiledMap.tilewidth + this._offsetX, // destination x
				(this._location.y - this._startRow) * this._tiledMap.tileheight + this._offsetY, // destination y
				this._tiledMap.tilewidth, // destination width
				this._tiledMap.tileheight, // destination height
			);
		}
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

		const startX = (this._cursorLocation.x - this._startCol) * this._tiledMap.tilewidth + this._offsetX;
		const startY = (this._cursorLocation.y - this._startRow) * this._tiledMap.tileheight + this._offsetY;
		const length = this._tiledMap.tileheight / 4;
		const gap = this._tiledMap.tileheight / 2;

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
	 * Renders the game by drawing the layers, player, and cursor.
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

		const p = this.loadImages();
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
		const location = this._getLocationByCoordinates(x, y);
		const properties = this._map.getTile(location.x, location.y);

		if (!properties || !properties.globalIDs.length || properties.blocking) {
			return;
		}

		const includeEndNode = [TileType.None, TileType.Entrance].includes(properties.type);
		const path = this._findPath(properties.location, includeEndNode);

		if (!path.length) {
			return;
		}

		const newLocation = path[path.length - 1];
		this._location = { x: newLocation[0], y: newLocation[1] };
		this._camera.move(this._location.x * this._tiledMap.tilewidth, this._location.y * this._tiledMap.tileheight);

		return properties;
	}

	/**
	 * Highlights the room that the player can move to based on the provided coordinates.
	 *
	 * @param {number} x - The x-coordinate of the location to highlight.
	 * @param {number} y - The y-coordinate of the location to highlight.
	 */
	public hover(x: number, y: number) {
		const location = this._getLocationByCoordinates(x, y);
		const properties = this._map.getTile(location.x, location.y);

		if (!properties || !properties.globalIDs.length || properties.blocking) {
			this._cursorLocation = null;
			this.canvas.style.cursor = "default";
			return;
		}

		this._cursorLocation = properties.location;
		this.canvas.style.cursor = "pointer";
	}

	/**
	 * Sets the hero data and updates the salvage sprite.
	 *
	 * @param {string} hero - The character class for the player.
	 */
	public setData(hero: ICharacter) {
		this.hero = hero;

		const salvageTileActive = this.hero.salvage <= 0;
		const salvageTile = this._map.map.flat().find((tile) => tile.type === TileType.Salvage);
		if (!salvageTile) {
			return;
		}

		salvageTile.active = salvageTileActive;
	}
}
