import { ILocation, IMapData, IPlayerData, IRoomData, TMapData } from "common/types";
import { ACCESSIBLE_ROOMS } from "common/utils/constants";
import { RoomState, RoomType } from "common/utils/enums";
import Camera from "./Camera";
import Loader from "./Loader";
import { AStarFinder } from "astar-typescript";
import tilemap from "assets/images/tilemap/tilemap2.png";

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
	private _camera: Camera;

	/**
	 * Constructor for the Game class.
	 *
	 * @param {IMapData} _map - The map data for the game.
	 * @param {IPlayerData} _player - The player data for the game.
	 * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
	 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
	 */
	constructor(
		private _map: IMapData,
		private _player: IPlayerData,
		public canvas: HTMLCanvasElement,
		public ctx: CanvasRenderingContext2D,
	) {
		this._camera = new Camera(
			this._map,
			this._player.location.x * this._map.tsize,
			this._player.location.y * this._map.tsize,
			this.canvas.width,
			this.canvas.height,
		);
	}

	/**
	 * Returns the active map based on the player's current location.
	 *
	 * @return {TMapData} The active map based on the player's current location.
	 */
	private get _activeMap(): TMapData {
		return this._map.maps[this._player.location.level];
	}

	/**
	 * Returns the starting column index based on the camera's x position and map tile size.
	 *
	 * @return {number} The starting column index.
	 */
	private get _startCol(): number {
		return Math.floor(this._camera.x / this._map.tsize);
	}

	/**
	 * Returns the ending column index based on the starting column, camera width, and map tile size.
	 *
	 * @return {number} The ending column index.
	 */
	private get _endCol(): number {
		return this._startCol + this._camera.width / this._map.tsize;
	}

	/**
	 * Returns the starting row index based on the camera's y position and map tile size.
	 *
	 * @return {number} The starting row index.
	 */
	private get _startRow(): number {
		return Math.floor(this._camera.y / this._map.tsize);
	}

	/**
	 * Calculates the ending row index based on the starting row, camera height, and map tile size.
	 *
	 * @return {number} The ending row index.
	 */
	private get _endRow(): number {
		return this._startRow + this._camera.height / this._map.tsize;
	}

	/**
	 * Calculates the x-axis offset based on the camera's x position, the starting column, and the map tile size.
	 *
	 * @return {number} The calculated x-axis offset.
	 */
	private get _offsetX(): number {
		return -this._camera.x + this._startCol * this._map.tsize;
	}

	/**
	 * Calculates the y-axis offset based on the camera's y position, the starting row, and the map tile size.
	 *
	 * @return {number} The calculated y-axis offset.
	 */
	private get _offsetY(): number {
		return -this._camera.y + this._startRow * this._map.tsize;
	}

	/**
	 * Loads necessary assets for the game, such as images, and returns a Promise array of the loaded images.
	 *
	 * @return {Promise<HTMLImageElement>[]} An array of Promises that resolve with the loaded images.
	 */
	private load(): Promise<HTMLImageElement>[] {
		return [Loader.loadImage("tiles", tilemap), Loader.loadImage("player", this._player.icon)];
	}

	/**
	 * Initializes the tileAtlas and playerIcon for the game.
	 */
	private init() {
		this._tileAtlas = Loader.getImage("tiles");
		this._playerIcon = Loader.getImage("player");
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
	 * @param {number} col - The column index of the tile.
	 * @param {number} row - The row index of the tile.
	 * @return {IRoomData | undefined} The tile object at the given coordinates.
	 */
	private _getTile(col: number, row: number): IRoomData | undefined {
		return this._activeMap[row]?.[col];
	}

	/**
	 * Retrieves the map location based on the provided x and y coordinates.
	 *
	 * @param {number} x - The x coordinate for the location.
	 * @param {number} y - The y coordinate for the location.
	 * @return {IRoomData | undefined} The room object at the specified coordinates.
	 */
	private _getTileAtLocation(x: number, y: number): IRoomData | undefined {
		const col = Math.floor(x / this._map.tsize) + this._startCol;
		const row = Math.round(y / this._map.tsize) + this._startRow;
		return this._getTile(col, row);
	}

	/**
	 * Finds a path from the current player position to the given destination location using A* pathfinding algorithm.
	 *
	 * @param {ILocation} destination - The destination location to find a path to.
	 * @return {number[][]} - An array of locations representing the path from start to end.
	 */
	private _findPath(destination: ILocation): number[][] {
		const matrix = this._activeMap.map((row, y) =>
			row.map(({ state }, x) => {
				if (y === destination.y && x === destination.x) {
					return 0;
				}
				return state === RoomState.Blocking ? 1 : 0;
			}),
		);
		const aStarInstance = new AStarFinder({
			grid: { matrix },
			diagonalAllowed: false,
		});
		const startPos = { x: this._player.location.x, y: this._player.location.y };
		const goalPos = { x: destination.x, y: destination.y };
		return aStarInstance.findPath(startPos, goalPos);
	}

	/**
	 * Draws a tile on the canvas at the specified coordinates.
	 *
	 * @param {IRoomData} tile - The tile to be drawn.
	 * @param {number} x - The x-coordinate for the tile.
	 * @param {number} y - The y-coordinate for the tile.
	 */
	private _drawTile(tile: IRoomData, x: number, y: number) {
		if (!this._tileAtlas) {
			return;
		}

		const isAccessible = this._findPath(tile.location).length > 0;

		this.ctx.drawImage(
			this._tileAtlas, // image
			tile.tile.x * this._map.tsize, // source x
			tile.tile.y * this._map.tsize, // source y
			this._map.tsize, // source width
			this._map.tsize, // source height
			Math.round(x), // target x
			Math.round(y), // target y
			this._map.tsize, // target width
			this._map.tsize, // target height
		);

		if (!isAccessible) {
			this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			this.ctx.fillRect(Math.round(x), Math.round(y), this._map.tsize, this._map.tsize);
			return;
		}

		if (tile.sprite) {
			this.ctx.drawImage(
				this._tileAtlas, // image
				tile.sprite.x * this._map.tsize, // source x
				tile.sprite.y * this._map.tsize, // source y
				this._map.tsize, // source width
				this._map.tsize, // source height
				Math.round(x), // target x
				Math.round(y), // target y
				this._map.tsize, // target width
				this._map.tsize, // target height
			);
		}
	}

	/**
	 * Draws the visible portion of the game map layer on the canvas based on the camera position.
	 *
	 */
	private _drawLayer() {
		for (let r = this._startRow; r <= this._endRow; r++) {
			for (let c = this._startCol; c <= this._endCol; c++) {
				const tile = this._getTile(c, r);
				const x = (c - this._startCol) * this._map.tsize + this._offsetX;
				const y = (r - this._startRow) * this._map.tsize + this._offsetY;
				if (tile && tile.type !== RoomType.None) {
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
		if (!this._playerIcon) {
			return;
		}

		this.ctx.drawImage(
			this._playerIcon, // image
			(this._player.location.x - this._startCol) * this._map.tsize + this._offsetX, // destination x
			(this._player.location.y - this._startRow) * this._map.tsize + this._offsetY, // destination y
			this._map.tsize, // destination width
			this._map.tsize, // destination height
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

		const startX = (this._cursorLocation.x - this._startCol) * this._map.tsize + this._offsetX;
		const startY = (this._cursorLocation.y - this._startRow) * this._map.tsize + this._offsetY;
		const length = this._map.tsize / 4;
		const gap = this._map.tsize / 2;

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
		this._drawLayer();

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

		const p = this.load();
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
	 * @return {IRoomData | undefined} The room at the new location or undefined if no room is found.
	 */
	public move(x: number, y: number): IRoomData | undefined {
		const tile = this._getTileAtLocation(x, y);

		if (!tile) {
			return;
		}

		if (!ACCESSIBLE_ROOMS.includes(tile.type)) {
			return;
		}

		if (!this._findPath(tile.location).length) {
			return;
		}

		this._player.location = tile.location;
		this._camera.move(this._player.location.x * this._map.tsize, this._player.location.y * this._map.tsize);

		return tile;
	}

	/**
	 * Highlights the room that the player can move to based on the provided coordinates.
	 *
	 * @param {number} x - The x-coordinate of the location to highlight.
	 * @param {number} y - The y-coordinate of the location to highlight.
	 */
	public hover(x: number, y: number) {
		const tile = this._getTileAtLocation(x, y);

		if (!tile) {
			this._cursorLocation = null;
			this.canvas.style.cursor = "default";
			return;
		}

		if (!ACCESSIBLE_ROOMS.includes(tile.type)) {
			this._cursorLocation = null;
			this.canvas.style.cursor = "default";
			return;
		}

		if (!this._findPath(tile.location).length) {
			this._cursorLocation = null;
			this.canvas.style.cursor = "default";
			return;
		}

		this._cursorLocation = tile.location;
		this.canvas.style.cursor = "pointer";
	}
}
