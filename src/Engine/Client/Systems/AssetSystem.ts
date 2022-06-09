import { Engine } from '../../Engine';
import { Logger } from '../../Util/Logger';
import { Scene } from '../../Scene';
import { System } from '../../System';
import { AssetType } from '../Types/AssetType';
import { RendererSystem } from './RendererSystem';

class imgToLoad {
	assetName: string = '';
	url: string = '';
	assetType: AssetType = AssetType.Image;
}

/**Handles Asset Loading / Retrieving */
export class AssetSystem extends System {
	private images: Map<string, HTMLCanvasElement> = new Map();

	private sceneName = 'Asset Loading Scene';
	init() {
		// create and load scene
		var assetScene = new Scene(this.sceneName);
		Engine.instance.addScene(assetScene);
	}
	_prevScene: string | undefined;
	start() {
		this.loadAssets();
		this._prevScene = Engine.instance.CurrentScene.Name;
		Engine.instance.getSystem(RendererSystem).clearColor = 'Black';
		Engine.instance.setScene(this.sceneName);
	}
	isLoading: boolean = true;
	update() {
		this.isLoading = imgToLoad.length != 0;
		if (!this.isLoading) {
			if (this._prevScene) Engine.instance.setScene(this._prevScene);
		}
	}

	imagesToLoad: imgToLoad[] = [];

	addAsset(assetName: string, url: string, assetType: AssetType) {
		let i = new imgToLoad();
		i.assetName = assetName;
		i.url = url;
		i.assetType = assetType;
		this.imagesToLoad.push(i);
	}

	loadAssets() {
		for (var i of this.imagesToLoad) {
			Logger.log(`Loading ${i.assetType}: ${i.assetName} "${i.url}"`);
			switch (i.assetType) {
				case AssetType.Image: {
					this.loadImage(i.assetName, i.url);
					break;
				}
				case AssetType.Sound: {
					this.loadSound(i.assetName, i.url);
					break;
				}
			}
		}
	}

	getImg(assetName: string): HTMLCanvasElement | null {
		var img = this.images.get(assetName);
		if (img) {
			return img;
		} else {
			return null;
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
			Logger.log(`Loaded Image ${assetName} ${url}`);
		};
	}
	private loadSound(assetName: string, url: string) {}
}
