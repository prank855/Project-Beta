import { Engine } from '../../Engine/Engine';
import { System } from '../../Engine/System';
import { Time } from '../../Engine/systems/Time';
import { Vector2 } from '../../Engine/Vector2';
import { Sprite } from '../types/Sprite';
import { CameraSystem } from './CameraSystem';
import { ScreenSystem } from './ScreenSystem';

export class RendererSystem extends System {
	screenSystem: ScreenSystem | null = null;
	cameraSystem: CameraSystem | null = null;
	sprites: Sprite[] = [];
	clearColor: string = 'White';
	debug: boolean = true;
	init() {
		this.screenSystem = Engine.self.getSystem(ScreenSystem);
		this.cameraSystem = Engine.self.getSystem(CameraSystem);
	}
	start() {}
	update() {
		if (this.screenSystem) {
			let ctx = this.screenSystem.context;
			if (ctx) {
				//Clear Screen
				ctx.fillStyle = this.clearColor;
				ctx.fillRect(0, 0, innerWidth, innerHeight);

				//Draw Sprites
				//console.log(`Amount of Sprite Calls: ${this.sprites.length}`);
				for (var s of this.sprites) {
					this.drawSprite(s);
				}

				//Draw GUI
				if (this.debug) {
					ctx.fillStyle = 'Black';
					ctx.font = '40px Arial';
					ctx.fillText(
						`FPS: ${
							Math.round((1 / Time.deltaTime + Number.EPSILON) * 100) / 100
						}`,
						10,
						50
					);
					ctx.fillText(
						`Sprite Calls: ${this.sprites.length}`,
						10,
						50 + 50 + 10
					);
				}

				//Draw Cursor

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
			if (this.screenSystem.context) {
				this.screenSystem.context.drawImage(
					sprite.image,
					pos.x -
						sprite.image.width *
							(sprite.scale / sprite.pixelPerUnit) *
							sprite.origin.x *
							this.cameraSystem.getZoom(),
					pos.y -
						sprite.image.height *
							(sprite.scale / sprite.pixelPerUnit) *
							sprite.origin.y *
							this.cameraSystem.getZoom(),
					sprite.image.width *
						(sprite.scale / sprite.pixelPerUnit) *
						this.cameraSystem.getZoom(),
					sprite.image.height *
						(sprite.scale / sprite.pixelPerUnit) *
						this.cameraSystem.getZoom()
				);
			} else {
				console.warn('image not loaded');
			}
		}
	}

	registerSprite(sprite: Sprite) {
		this.sprites.push(sprite);
	}
}
