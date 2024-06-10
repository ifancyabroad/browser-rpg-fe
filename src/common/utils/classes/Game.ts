import { ILocation, IMapData, IPlayerData, IRoom } from "common/types";
import { ACCESSIBLE_ROOMS } from "common/utils/constants";
import { RoomState, RoomType } from "common/utils/enums";
import Camera from "./Camera";
import Loader from "./Loader";
import { AStarFinder } from "astar-typescript";
import tilemap from "assets/images/tilemap/tilemap.png";

interface IGame {
	run(): void;
	move(x: number, y: number): void;
}

export class Game implements IGame {
	private _previousElapsed: number = 0;
	private _tileAtlas: HTMLImageElement | null = null;
	private _playerIcon: HTMLImageElement | null = null;
	private _camera: Camera | null = null;

	/**
	 * Constructor for the Game class.
	 *
	 * @param {IMapData} map - The map data.
	 * @param {CanvasRenderingContext2D | null} ctx - The canvas rendering context.
	 */
	constructor(
		private map: IMapData,
		private player: IPlayerData,
		public canvas: HTMLCanvasElement,
		public ctx: CanvasRenderingContext2D,
	) {}

	/**
	 * Loads necessary assets for the game, such as images, and returns a Promise array of the loaded images.
	 *
	 * @return {Promise<HTMLImageElement>[]} An array of Promises that resolve with the loaded images.
	 */
	private load(): Promise<HTMLImageElement>[] {
		return [Loader.loadImage("tiles", tilemap), Loader.loadImage("player", this.player.icon)];
	}

	/**
	 * Initializes the tileAtlas and camera for the game.
	 */
	private init() {
		this._tileAtlas = Loader.getImage("tiles");
		this._playerIcon = Loader.getImage("player");
		this._camera = new Camera(this.map, this.canvas.width, this.canvas.height);
	}

	/**
	 * Update the game state based on the delta time.
	 *
	 * @param {number} delta - The time elapsed since the last update.
	 */
	private update(delta: number) {
		if (!this._camera) {
			return;
		}
		var dirx = 0;
		var diry = 0;
		this._camera.move(delta, dirx, diry);
	}

	/**
	 * Retrieves the tile located at the specified column and row coordinates.
	 *
	 * @param {number} col - The column index of the tile.
	 * @param {number} row - The row index of the tile.
	 * @return {IRoom | undefined} The tile object at the given coordinates.
	 */
	private _getTile(col: number, row: number): IRoom | undefined {
		return this.map.map[row]?.[col];
	}

	/**
	 * Retrieves the map location based on the provided x and y coordinates.
	 *
	 * @param {number} x - The x coordinate for the location.
	 * @param {number} y - The y coordinate for the location.
	 * @return {IRoom | undefined} The room object at the specified coordinates.
	 */
	private _getTileAtLocation(x: number, y: number): IRoom | undefined {
		const col = Math.floor(x / this.map.tsize);
		const row = Math.floor(y / this.map.tsize);
		return this._getTile(col, row);
	}

	/**
	 * Finds a path from the current player position to the given destination location using A* pathfinding algorithm.
	 *
	 * @param {ILocation} destination - The destination location to find a path to.
	 * @return {number[][]} - An array of locations representing the path from start to end.
	 */
	private _findPath(destination: ILocation): number[][] {
		const matrix = this.map.map.map((row, y) =>
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
		const startPos = { x: this.player.location.x, y: this.player.location.y };
		const goalPos = { x: destination.x, y: destination.y };
		return aStarInstance.findPath(startPos, goalPos);
	}

	/**
	 * Draws a tile on the canvas at the specified coordinates.
	 *
	 * @param {IRoom} tile - The tile to be drawn.
	 * @param {number} x - The x-coordinate for the tile.
	 * @param {number} y - The y-coordinate for the tile.
	 */
	private _drawTile(tile: IRoom, x: number, y: number) {
		if (!this._tileAtlas) {
			return;
		}

		const isAccessible = this._findPath(tile.location).length > 0;

		this.ctx.drawImage(
			this._tileAtlas, // image
			tile.tile.x * this.map.tsize, // source x
			tile.tile.y * this.map.tsize, // source y
			this.map.tsize, // source width
			this.map.tsize, // source height
			Math.round(x), // target x
			Math.round(y), // target y
			this.map.tsize, // target width
			this.map.tsize, // target height
		);

		if (!isAccessible) {
			this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			this.ctx.fillRect(Math.round(x), Math.round(y), this.map.tsize, this.map.tsize);
		}
	}

	/**
	 * Draws the visible portion of the game map layer on the canvas based on the camera position.
	 *
	 */
	private _drawLayer() {
		if (!this._camera) {
			return;
		}

		const startCol = Math.floor(this._camera.x / this.map.tsize);
		const endCol = Math.min(startCol + this._camera.width / this.map.tsize, this.map.cols - 1);
		const startRow = Math.floor(this._camera.y / this.map.tsize);
		const endRow = Math.min(startRow + this._camera.height / this.map.tsize, this.map.rows - 1);
		const offsetX = -this._camera.x + startCol * this.map.tsize;
		const offsetY = -this._camera.y + startRow * this.map.tsize;

		for (let r = startRow; r <= endRow; r++) {
			for (let c = startCol; c <= endCol; c++) {
				const tile = this._getTile(c, r);
				const x = (c - startCol) * this.map.tsize + offsetX;
				const y = (r - startRow) * this.map.tsize + offsetY;
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
			this.player.location.x * this.map.tsize, // source x
			this.player.location.y * this.map.tsize, // source y
			this.map.tsize, // source width
			this.map.tsize, // source height
		);
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
			// this.render();
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
		this.ctx.clearRect(0, 0, 512, 512);

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
	 * @return {IRoom | undefined} The room at the new location or undefined if no room is found.
	 */
	public move(x: number, y: number): IRoom | undefined {
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

		this.player.location = tile.location;

		return tile;
	}
}
