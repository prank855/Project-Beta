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
	screenSystem: ScreenSystem | undefined;
	cameraSystem: Viewport | undefined;
	sprites: Sprite[] = [];
	clearColor: string = 'White';
	debug: boolean = true;
	filtering: RenderFilterType = RenderFilterType.POINT;
	spriteCalls: number = 0;

	override init() {
		this.screenSystem = Engine.instance.getSystem(ScreenSystem);
		this.cameraSystem = Engine.instance.getSystem(Viewport);
	}
	override lateUpdate() {
		this.spriteCalls = 0;
		if (this.screenSystem) {
			let ctx = this.screenSystem.context;
			if (ctx) {
				if ((this.filtering = RenderFilterType.POINT)) {
					ctx.imageSmoothingEnabled = false;
				}
				if ((this.filtering = RenderFilterType.SMOOTH)) {
					ctx.imageSmoothingEnabled = true;
				}
				//Clear Screen
				ctx.fillStyle = this.clearColor;
				ctx.fillRect(0, 0, innerWidth, innerHeight);

				//Draw Sprites
				for (var s of this.sprites) {
					this.drawSprite(s);
				}

				this.sprites.length = 0;
			}
		}
	}

	drawSprite(sprite: Sprite): boolean {
		// check if systems exist
		if (!(this.screenSystem && sprite.image && this.cameraSystem)) {
			return false;
		}
		if (!sprite.transform) return false;

		var spriteHeight =
			sprite.image.height *
			(sprite.scale / sprite.pixelsPerUnit) *
			this.cameraSystem.currSpriteZoom;

		var spriteWidth =
			sprite.image.width *
			(sprite.scale / sprite.pixelsPerUnit) *
			this.cameraSystem.currSpriteZoom;

		// get screen position
		var pos = this.cameraSystem.toScreenSpace(sprite.transform.position);
		// adjust position with offset
		pos = new Vector2(
			pos.x -
				sprite.image.width *
					(sprite.scale / sprite.pixelsPerUnit) *
					sprite.origin.x *
					this.cameraSystem.currSpriteZoom,
			pos.y -
				sprite.image.height *
					(sprite.scale / sprite.pixelsPerUnit) *
					sprite.origin.y *
					this.cameraSystem.currSpriteZoom
		);

		// check if sprite is in bounds of viewport
		if (
			pos.x + spriteWidth >= 0 &&
			pos.x < this.screenSystem.screenWidth &&
			pos.y + spriteHeight >= 0 &&
			pos.y < this.screenSystem.screenHeight
		) {
			if (this.screenSystem.context) {
				this.spriteCalls++;
				this.screenSystem.context.drawImage(
					sprite.image,
					pos.x,
					pos.y,
					spriteWidth,
					spriteHeight
				);
				return true;
			} else {
				console.warn('image not loaded');
			}
		}

		return false;
	}

	registerSprite(sprite: Sprite) {
		this.sprites.push(sprite);
	}
}
