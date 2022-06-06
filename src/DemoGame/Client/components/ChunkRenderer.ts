import { SpriteRenderer } from '../../../Client/components/SpriteRenderer';
import { AssetSystem } from '../../../Client/systems/AssetSystem';
import { ScreenSystem } from '../../../Client/systems/ScreenSystem';
import { AssetType } from '../../../Client/types/AssetType';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { Chunk } from './Chunk';

export class ChunkRenderer extends GameComponent {
	chunk: Chunk | undefined;

	spriteRenderer: SpriteRenderer | undefined;
	start(): void {
		this.chunk = this.parent.getComponent(Chunk);
		this.spriteRenderer = this.parent.addComponent(SpriteRenderer);
		this.setupChunkImage();
	}

	rendered: boolean = false;

	update(): void {
		if (!this.rendered) this.rendered = this.setupChunkImage();
	}

	canvas: HTMLCanvasElement = document.createElement('canvas');
	setupChunkImage(): boolean {
		if (!this.chunk) return false;
		this.canvas.width = this.chunk.size * 32;
		this.canvas.height = this.chunk.size * 32;
		var ctx = this.canvas.getContext('2d');
		if (!ctx || !this.chunk) return false;
		var assetSystem = Engine.instance.getSystem(AssetSystem);
		for (var i = 0; i < this.chunk.size * this.chunk.size; i++) {
			var img = assetSystem.getImg(this.chunk.tiles[i].tileImgSrc);
			if (!img) return false;
			ctx.drawImage(
				img,
				(i % this.chunk.size) * 32,
				Math.floor(i / this.chunk.size) * 32,
				32,
				32
			);
		}
		if (!this.spriteRenderer) return false;
		this.spriteRenderer.sprite.pixelsPerUnit = 32;
		this.spriteRenderer.setImage(this.canvas);
		return true;
	}
}
