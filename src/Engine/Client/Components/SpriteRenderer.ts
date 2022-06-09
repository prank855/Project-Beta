import { Engine } from '../../Engine';
import { GameComponent } from '../../GameComponent';
import { Sprite } from '../Types/Sprite';
import { AssetSystem } from '../Systems/AssetSystem';
import { RendererSystem } from '../Systems/RendererSystem';
import { AssetType } from '../Types/AssetType';

export class SpriteRenderer extends GameComponent {
	private renderer: RendererSystem | undefined;
	sprite: Sprite = new Sprite();

	override start() {
		if (Engine.instance.getSystem(RendererSystem)) {
			this.renderer = Engine.instance.getSystem(RendererSystem);
		} else {
			throw `Did not find Renderer System`;
		}
	}
	override update() {
		if (this.assetName != '' && !this.loadedAsset) {
			var img = Engine.instance
				.getSystem(AssetSystem)
				.getAsset(this.assetName, AssetType.Image);
			if (img) {
				this.sprite.image = img;
				this.loadedAsset = true;
			}
		}
		if (this.renderer) {
			if (this.parent) {
				this.sprite.transform = this.parent.getWorldPosition();
			}
			this.renderer.registerSprite(this.sprite);
		}
	}

	private loadedAsset: boolean = false;
	private assetName: string = '';
	setSprite(assetName: string) {
		this.assetName = assetName;
		this.loadedAsset = false;
	}
	setImage(image: HTMLCanvasElement) {
		this.assetName = 'Raw Image';
		this.loadedAsset = true;
		this.sprite.image = image;
	}
}
