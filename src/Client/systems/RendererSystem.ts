import { Engine } from '../../Engine/Engine';
import { System } from '../../Engine/System';
import { Time } from '../../Engine/systems/Time';
import { Vector2 } from '../../Engine/Vector2';
import { RenderFilterType } from '../types/RenderFilterType';
import { Sprite } from '../types/Sprite';
import { CameraSystem } from './CameraSystem';
import { ScreenSystem } from './ScreenSystem';

export class RendererSystem extends System {
	screenSystem: ScreenSystem | null = null;
	cameraSystem: CameraSystem | null = null;
	sprites: Sprite[] = [];
	clearColor: string = 'White';
	debug: boolean = true;
	filtering: RenderFilterType = RenderFilterType.POINT;
	init() {
		this.screenSystem = Engine.instance.getSystem(ScreenSystem);
		this.cameraSystem = Engine.instance.getSystem(CameraSystem);
	}
	start() {}
	update() {
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

	drawSprite(sprite: Sprite) {
		var pos = new Vector2();
		if (sprite.transform) {
			pos = sprite.transform.position;
		}
		if (this.screenSystem && sprite.image && this.cameraSystem) {
			pos = this.cameraSystem.toScreenSpace(pos);
			if (!this.screenSystem.canvas) return;
			var spriteHeight =
				sprite.image.height *
				(sprite.scale / sprite.pixelsPerUnit) *
				this.cameraSystem.getZoom();

			var spriteWidth =
				sprite.image.width *
				(sprite.scale / sprite.pixelsPerUnit) *
				this.cameraSystem.getZoom();

			if (
				pos.x + spriteWidth > 0 &&
				pos.x - spriteWidth < this.screenSystem.canvas.width &&
				pos.y + spriteHeight > 0 &&
				pos.y - spriteHeight < this.screenSystem.canvas.height
			) {
				if (this.screenSystem.context) {
					this.screenSystem.context.drawImage(
						sprite.image,
						pos.x -
							sprite.image.width *
								(sprite.scale / sprite.pixelsPerUnit) *
								sprite.origin.x *
								this.cameraSystem.getZoom(),
						pos.y -
							sprite.image.height *
								(sprite.scale / sprite.pixelsPerUnit) *
								sprite.origin.y *
								this.cameraSystem.getZoom(),
						spriteWidth,
						spriteHeight
					);
				} else {
					console.warn('image not loaded');
				}
			}
		}
	}

	registerSprite(sprite: Sprite) {
		this.sprites.push(sprite);
	}
}
