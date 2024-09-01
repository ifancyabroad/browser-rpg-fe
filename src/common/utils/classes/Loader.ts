interface ILoader {
	loadImage(key: string, src: string): Promise<HTMLImageElement>;
	getImage(key: string): HTMLImageElement | null;
}

class Loader implements ILoader {
	private images: Record<string, HTMLImageElement> = {};

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
	 * Returns the image associated with the provided key if it exists in the images collection, otherwise returns null.
	 *
	 * @param {string} key - The key to look up the image in the images collection.
	 * @return {HTMLImageElement | null} The image associated with the key, or null if not found.
	 */
	public getImage(key: string): HTMLImageElement | null {
		return key in this.images ? this.images[key] : null;
	}
}

const loader = new Loader();
export default loader;
