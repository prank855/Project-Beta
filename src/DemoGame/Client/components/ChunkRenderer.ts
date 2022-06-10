import { SpriteRenderer } from '../../../Engine/Client/Components/SpriteRenderer';
import { AssetSystem } from '../../../Engine/Client/Systems/AssetSystem';
import { Origin } from '../../../Engine/Client/Types/Origin';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { Chunk } from './Chunk';

export class ChunkRenderer extends GameComponent {
	chunk: Chunk | undefined;

	spriteRenderer: SpriteRenderer | undefined;
	override start(): void {
		this.chunk = this.parent.getComponent(Chunk);
		this.spriteRenderer = this.parent.addComponent(SpriteRenderer);
		this.setupChunkImage();
	}

	rendered: boolean = false;

	override update(): void {
		if (!this.rendered) this.rendered = this.setupChunkImage();
	}

	canvas: HTMLCanvasElement = document.createElement('canvas');
	setupChunkImage(): boolean {
		var imgSize = 32;
		if (!this.chunk) return false;
		this.canvas.width = this.chunk.size * imgSize;
		this.canvas.height = this.chunk.size * imgSize;
		var ctx = this.canvas.getContext('2d');
		if (!ctx || !this.chunk) return false;
		var assetSystem = Engine.instance.getSystem(AssetSystem);
		for (var i = 0; i < this.chunk.size * this.chunk.size; i++) {
			var img = assetSystem.getImage(this.chunk.tiles[i].tileImgSrc);
			if (!img) return false;
			ctx.drawImage(
				img,
				(i % this.chunk.size) * imgSize,
				Math.floor(i / this.chunk.size) * imgSize,
				imgSize,
				imgSize
			);
		}
		if (!this.spriteRenderer) return false;
		this.spriteRenderer.sprite.pixelsPerUnit = imgSize;
		this.spriteRenderer.sprite.origin = Origin.BOTTOM_LEFT;
		this.spriteRenderer.setImage(this.canvas);
		return true;
	}
}
