import { IMapData } from "common/types";

interface ICamera {
	x: number;
	y: number;
	width: number;
	height: number;
	move(x: number, y: number): void;
}

class Camera implements ICamera {
	private maxX: number;
	private maxY: number;

	/**
	 * Constructor for the Camera class.
	 *
	 * @param {IMapData} map - The map data.
	 * @param {number} x - The x-coordinate of the camera.
	 * @param {number} y - The y-coordinate of the camera.
	 * @param {number} width - The width of the camera.
	 * @param {number} height - The height of the camera.
	 */
	constructor(
		public map: IMapData,
		public x: number,
		public y: number,
		public width: number,
		public height: number,
	) {
		this.maxX = map.cols * map.tsize - width;
		this.maxY = map.rows * map.tsize - height;
		this.move(x, y);
	}

	/**
	 * Moves the camera to the specified coordinates and clamps the camera position within the map boundaries.
	 *
	 * @param {number} x - The new x-coordinate for the camera.
	 * @param {number} y - The new y-coordinate for the camera.
	 */
	public move(x: number, y: number) {
		// move camera
		this.x = x;
		this.y = y;

		// clamp camera
		this.x = Math.max(0, Math.min(this.maxX, this.x));
		this.y = Math.max(0, Math.min(this.maxY, this.y));
	}
}

export default Camera;
