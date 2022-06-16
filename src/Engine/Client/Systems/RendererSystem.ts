import { Engine } from '../../Engine';
import { System } from '../../System';
import { RenderFilterType } from '../Types/RenderFilterType';
import { Sprite } from '../Types/Sprite';
import { Viewport } from './Viewport';
import { ScreenSystem } from './ScreenSystem';
import { Vector2 } from '../../Types/Vector2';

/** Handles rendering sprites to canvas */
export class RendererSystem extends System {
	start(): void {}
	update(): void {}
	private screenSystem!: ScreenSystem;
	private viewport!: Viewport;
	private sprites: Sprite[] = [];
	debug: boolean = true;
	filtering: RenderFilterType = RenderFilterType.POINT;
	spriteCalls: number = 0;

	private canvas!: HTMLCanvasElement;
	private context!: CanvasRenderingContext2D;

	override init() {
		this.screenSystem = Engine.instance.getSystem(ScreenSystem);
		this.context = this.screenSystem.getContext();
		this.canvas = this.screenSystem.getCanvas();
		this.viewport = Engine.instance.getSystem(Viewport);
	}
	override lateUpdate() {
		this.spriteCalls = 0;

		switch (this.filtering) {
			case RenderFilterType.POINT:
				this.context.imageSmoothingEnabled = false;
				break;
			case RenderFilterType.SMOOTH:
				this.context.imageSmoothingEnabled = true;
				break;
		}

		// Clear screen
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		//Draw Sprites
		for (let s of this.sprites) {
			this.drawSprite(s);
		}

		// Clear sprite array
		this.sprites = [];
	}

	drawSprite(sprite: Sprite): boolean {
		// check if systems exist
		if (!sprite.image || !sprite.transform) {
			return false;
		}

		let spriteHeight =
			sprite.image.height *
			(sprite.scale / sprite.pixelsPerUnit) *
			this.viewport.getSpriteZoomScale;

		let spriteWidth =
			sprite.image.width *
			(sprite.scale / sprite.pixelsPerUnit) *
			this.viewport.getSpriteZoomScale;

		// get screen position
		let pos = this.viewport.toScreenSpace(sprite.transform.position);

		// adjust position with offset
		pos = new Vector2(
			pos.x -
				sprite.image.width *
					(sprite.scale / sprite.pixelsPerUnit) *
					sprite.origin.x *
					this.viewport.getSpriteZoomScale,
			pos.y -
				sprite.image.height *
					(sprite.scale / sprite.pixelsPerUnit) *
					sprite.origin.y *
					this.viewport.getSpriteZoomScale
		);

		// check if sprite is in bounds of viewport
		if (
			pos.x + spriteWidth >= 0 &&
			pos.x < this.screenSystem.getScreenWidth &&
			pos.y + spriteHeight >= 0 &&
			pos.y < this.screenSystem.getScreenHeight
		) {
			if (this.context) {
				this.spriteCalls++;
				this.context.drawImage(
					sprite.image,
					pos.x,
					pos.y,
					spriteWidth,
					spriteHeight
				);
				return true;
			}
		}

		return false;
	}

	registerSprite(sprite: Sprite) {
		this.sprites.push(sprite);
	}
}
