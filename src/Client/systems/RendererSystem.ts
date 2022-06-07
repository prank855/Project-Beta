import { Engine } from '../../Engine/Engine';
import { System } from '../../Engine/System';
import { Time } from '../../Engine/systems/Time';
import { Vector2 } from '../../Engine/Vector2';
import { RenderFilterType } from '../types/RenderFilterType';
import { Sprite } from '../types/Sprite';
import { Viewport } from './Viewport';
import { ScreenSystem } from './ScreenSystem';

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
				//console.log(`Amount of Sprite Calls: ${this.sprites.length}`);
				for (var s of this.sprites) {
					this.drawSprite(s);
				}

				this.sprites.length = 0;
			}
		}
	}

	drawSprite(sprite: Sprite): boolean {
		var pos = new Vector2();
		if (sprite.transform) {
			pos = sprite.transform.position;
		}
		if (this.screenSystem && sprite.image && this.cameraSystem) {
			pos = this.cameraSystem.toScreenSpace(pos);
			if (!this.screenSystem.canvas) return false;
			var spriteHeight =
				sprite.image.height *
				(sprite.scale / sprite.pixelsPerUnit) *
				this.cameraSystem.getZoom();

			var spriteWidth =
				sprite.image.width *
				(sprite.scale / sprite.pixelsPerUnit) *
				this.cameraSystem.getZoom();

			var offSetPos = new Vector2(
				pos.x -
					sprite.image.width *
						(sprite.scale / sprite.pixelsPerUnit) *
						sprite.origin.x *
						this.cameraSystem.getZoom(),
				pos.y -
					sprite.image.height *
						(sprite.scale / sprite.pixelsPerUnit) *
						sprite.origin.y *
						this.cameraSystem.getZoom()
			);

			if (
				offSetPos.x + spriteWidth >= 0 &&
				offSetPos.x < this.screenSystem.canvas.width &&
				offSetPos.y + spriteHeight >= 0 &&
				offSetPos.y < this.screenSystem.canvas.height
			) {
				if (this.screenSystem.context) {
					this.spriteCalls++;
					this.screenSystem.context.drawImage(
						sprite.image,
						offSetPos.x,
						offSetPos.y,
						spriteWidth,
						spriteHeight
					);
					return true;
				} else {
					console.warn('image not loaded');
				}
			}
		}
		return false;
	}

	registerSprite(sprite: Sprite) {
		this.sprites.push(sprite);
	}
}
