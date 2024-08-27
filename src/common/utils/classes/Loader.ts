import TiledMap from "tiled-types";
import { decodeMapData } from "common/utils";

interface ILoader {
	loadImage(key: string, src: string): Promise<HTMLImageElement>;
	loadMap(key: string, src: string): Promise<TiledMap>;
	getImage(key: string): HTMLImageElement | null;
	getMap(key: string): TiledMap | null;
}

class Loader implements ILoader {
	private images: Record<string, HTMLImageElement> = {};
	private maps: Record<string, TiledMap> = {};

	/**
	 * Asynchronously loads an image from the provided source URL and resolves with the loaded image or rejects with an error message if the image could not be loaded.
	 *
	 * @param {string} key - The key to associate with the loaded image in the images collection.
	 * @param {string} src - The URL of the image to load.
	 * @return {Promise<HTMLImageElement>} A Promise that resolves with the loaded image or rejects with an error message.
	 */
	public async loadImage(key: string, src: string): Promise<HTMLImageElement> {
		const img = new Image();

		const d = new Promise<HTMLImageElement>((resolve, reject) => {
			img.onload = () => {
				this.images[key] = img;
				resolve(img);
			};

			img.onerror = () => {
				reject("Could not load image: " + src);
			};
		});

		img.src = src;
		return d;
	}

	/**
	 * Asynchronously loads a Tiled map from the provided JSON data and resolves with the loaded map or rejects with an error message if the map could not be loaded.
	 *
	 * @param {string} key - The key to associate with the loaded map in the maps collection.
	 * @param {string} jsonData - The JSON data of the map to load.
	 * @return {Promise<TiledMap>} A Promise that resolves with the loaded map or rejects with an error message.
	 */
	public loadMap(key: string, jsonData: string): Promise<TiledMap> {
		const d = new Promise<TiledMap>((resolve, reject) => {
			const map = JSON.parse(JSON.stringify(jsonData)) as TiledMap;
			map.layers = map.layers.map((layer) => {
				if ("data" in layer) {
					layer.data = decodeMapData(layer.data as string);
				}
				return layer;
			});
			this.maps[key] = map;
			resolve(map);
		});

		return d;
	}

	/**
	 * Returns the image associated with the provided key if it exists in the images collection, otherwise returns null.
	 *
	 * @param {string} key - The key to look up the image in the images collection.
	 * @return {HTMLImageElement | null} The image associated with the key, or null if not found.
	 */
	public getImage(key: string): HTMLImageElement | null {
		return key in this.images ? this.images[key] : null;
	}

	/**
	 * Returns the map associated with the provided key if it exists in the maps collection, otherwise returns null.
	 *
	 * @param {string} key - The key to look up the map in the maps collection.
	 * @return {TiledMap | null} The map associated with the key, or null if not found.
	 */
	public getMap(key: string): TiledMap | null {
		return key in this.maps ? this.maps[key] : null;
	}

	/**
	 * Returns the maps collection.
	 *
	 * @return {Record<string, TiledMap>} The maps collection.
	 */
	public getMaps(): Record<string, TiledMap> {
		return this.maps;
	}
}

const loader = new Loader();
export default loader;
