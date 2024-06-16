import { IMapData } from "common/types";

interface ICamera {
	x: number;
	y: number;
	width: number;
	height: number;
	move(x: number, y: number): void;
}

class Camera implements ICamera {
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
		this.move(x, y);
	}

	/**
	 * Moves the camera to the specified coordinates and clamps the camera position within the map boundaries.
	 *
	 * @param {number} x - The new x-coordinate for the camera.
	 * @param {number} y - The new y-coordinate for the camera.
	 */
	public move(x: number, y: number) {
		this.x = x - this.width / 2;
		this.y = y - this.height / 2;
	}
}

export default Camera;
