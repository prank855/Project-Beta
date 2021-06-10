import { Engine } from '../../Engine/Engine';
import { System } from '../../Engine/System';
import { AssetType } from '../AssetType';

export class AssetSystem extends System {
	private images: Map<string, HTMLCanvasElement> = new Map();
	init() {}
	start() {}
	update() {}
	loadAsset(assetName: string, url: string, assetType: AssetType) {
		console.log(`Loading ${assetType}: ${assetName} "${url}"`);
		switch (assetType) {
			case AssetType.Image: {
				this.loadImage(assetName, url);
				break;
			}
			case AssetType.Sound: {
				this.loadSound(assetName, url);
				break;
			}
		}
	}

	getAsset(assetName: string, assetType: AssetType): HTMLCanvasElement | null {
		switch (assetType) {
			case AssetType.Image: {
				var img = this.images.get(assetName);
				if (img) {
					return img;
				}
			}
		}
		return null;
	}

	private loadImage(assetName: string, url: string) {
		Engine.self.halt(this);
		var img = new Image();
		img.src = url;
		img.onerror = () => {
			throw `Could not find ${url}`;
		};
		img.onload = () => {
			var canvas: HTMLCanvasElement = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			canvas.getContext('2d')?.drawImage(img, 0, 0);
			this.images.set(assetName, canvas);
			console.log(`Loaded Image ${assetName} ${url}`);
			Engine.self.unhalt(this);
		};
	}
	private loadSound(assetName: string, url: string) {}
}
