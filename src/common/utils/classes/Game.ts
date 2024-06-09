import { IMapData, IRoom } from "common/types";
import Camera from "./Camera";
import Loader from "./Loader";
import { RoomType } from "common/utils/enums";
import tilemap from "assets/images/tilemap/tilemap.png";

interface IGame {
	run(): void;
}

export class Game implements IGame {
	private _previousElapsed: number = 0;
	private tileAtlas: HTMLImageElement | null = null;
	private camera: Camera | null = null;

	/**
	 * Constructor for the Game class.
	 *
	 * @param {IMapData} map - The map data.
	 * @param {CanvasRenderingContext2D | null} ctx - The canvas rendering context.
	 */
	constructor(
		private map: IMapData,
		public ctx: CanvasRenderingContext2D | null,
	) {}

	/**
	 * Loads necessary assets for the game, such as images, and returns a Promise array of the loaded images.
	 *
	 * @return {Promise<HTMLImageElement>[]} An array of Promises that resolve with the loaded images.
	 */
	private load(): Promise<HTMLImageElement>[] {
		return [Loader.loadImage("tiles", tilemap)];
	}

	/**
	 * Initializes the tileAtlas and camera for the game.
	 */
	private init() {
		this.tileAtlas = Loader.getImage("tiles");
		this.camera = new Camera(this.map, 800, 600);
	}

	/**
	 * Update the game state based on the delta time.
	 *
	 * @param {number} delta - The time elapsed since the last update.
	 */
	private update(delta: number) {
		if (!this.camera) {
			return;
		}
		var dirx = 0;
		var diry = 0;
		this.camera.move(delta, dirx, diry);
	}

	/**
	 * Retrieves the tile located at the specified column and row coordinates.
	 *
	 * @param {number} col - The column index of the tile.
	 * @param {number} row - The row index of the tile.
	 * @return {IRoom} The tile object at the given coordinates.
	 */
	private _getTile(col: number, row: number): IRoom {
		return this.map.map[row][col];
	}

	/**
	 * Draws the visible portion of the game map layer on the canvas based on the camera position.
	 *
	 */
	private _drawLayer() {
		if (!this.ctx || !this.tileAtlas || !this.camera) {
			return;
		}

		const startCol = Math.floor(this.camera.x / this.map.tsize);
		const endCol = Math.min(startCol + this.camera.width / this.map.tsize, this.map.cols - 1);
		const startRow = Math.floor(this.camera.y / this.map.tsize);
		const endRow = Math.min(startRow + this.camera.height / this.map.tsize, this.map.rows - 1);
		const offsetX = -this.camera.x + startCol * this.map.tsize;
		const offsetY = -this.camera.y + startRow * this.map.tsize;

		for (let r = startRow; r <= endRow; r++) {
			for (let c = startCol; c <= endCol; c++) {
				const tile = this._getTile(c, r);
				const x = (c - startCol) * this.map.tsize + offsetX;
				const y = (r - startRow) * this.map.tsize + offsetY;
				if (tile.type !== RoomType.None) {
					// 0 => empty tile
					this.ctx.drawImage(
						this.tileAtlas, // image
						tile.tile.x * this.map.tsize, // source x
						tile.tile.y * this.map.tsize, // source y
						this.map.tsize, // source width
						this.map.tsize, // source height
						Math.round(x), // target x
						Math.round(y), // target y
						this.map.tsize, // target width
						this.map.tsize, // target height
					);
				}
			}
		}
	}

	/**
	 * Renders the game by drawing the layer.
	 *
	 */
	public render() {
		this._drawLayer();
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
			this.render();
			// window.requestAnimationFrame(this.tick.bind(this));
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
}
