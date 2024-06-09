import { IMapData } from "common/types";

interface ICamera {
	x: number;
	y: number;
	move(delta: number, dirx: number, diry: number): void;
}

class Camera implements ICamera {
	public static SPEED: number = 0;
	public x: number;
	public y: number;
	private maxX: number;
	private maxY: number;

	/**
	 * Constructor for the Camera class.
	 *
	 * @param {IMapData} map - The map data.
	 * @param {number} width - The width of the camera.
	 * @param {number} height - The height of the camera.
	 */
	constructor(
		public map: IMapData,
		public width: number,
		public height: number,
	) {
		this.x = 0;
		this.y = 0;

		this.maxX = map.cols * map.tsize - width;
		this.maxY = map.rows * map.tsize - height;
	}

	/**
	 * Moves the camera based on the provided direction and speed.
	 *
	 * @param {number} delta - The time delta for smooth movement.
	 * @param {number} dirx - The direction of movement on the x-axis.
	 * @param {number} diry - The direction of movement on the y-axis.
	 */
	public move(delta: number, dirx: number, diry: number) {
		// move camera
		this.x += dirx * Camera.SPEED * delta;
		this.y += diry * Camera.SPEED * delta;

		// clamp camera
		this.x = Math.max(0, Math.min(this.maxX, this.x));
		this.y = Math.max(0, Math.min(this.maxY, this.y));
	}
}

export default Camera;
