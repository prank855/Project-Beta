import { Engine } from '../../Engine/Engine';
import { GameComponent } from '../../Engine/GameComponent';
import { Sprite } from '../types/Sprite';
import { AssetSystem } from '../systems/AssetSystem';
import { RendererSystem } from '../systems/RendererSystem';
import { AssetType } from '../types/AssetType';

export class SpriteRenderer extends GameComponent {
	private renderer: RendererSystem | null = null;
	sprite: Sprite = new Sprite();
	start() {
		if (Engine.self.getSystem(RendererSystem)) {
			this.renderer = Engine.self.getSystem(RendererSystem);
		} else {
			throw `Did not find Renderer System`;
		}
	}
	update() {
		if (this.assetName != '' && !this.loadedAsset) {
			var img = Engine.self
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
}
