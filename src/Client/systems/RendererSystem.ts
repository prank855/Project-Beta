import { Engine } from '../../Engine/Engine';
import { System } from '../../Engine/System';
import { Vector2 } from '../../Engine/Vector2';
import { Sprite } from '../types/Sprite';
import { CameraSystem } from './CameraSystem';
import { ScreenSystem } from './ScreenSystem';

export class RendererSystem extends System {
	screenSystem: ScreenSystem | null = null;
	cameraSystem: CameraSystem | null = null;
	sprites: Sprite[] = [];
	init() {
		this.screenSystem = Engine.self.getSystem(ScreenSystem);
		this.cameraSystem = Engine.self.getSystem(CameraSystem);
	}
	start() {}
	update() {
		if (this.screenSystem) {
			if (this.screenSystem.context) {
				//Clear Screen
				this.screenSystem.context.fillStyle = 'White';
				this.screenSystem.context.fillRect(0, 0, innerWidth, innerHeight);

				//Draw Sprites
				//console.log(`Amount of Sprite Calls: ${this.sprites.length}`);
				for (var s of this.sprites) {
					this.drawSprite(s);
				}
				this.sprites.length = 0;

				//Draw GUI

				//Draw Cursor
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
			}
		}
	}

	registerSprite(sprite: Sprite) {
		this.sprites.push(sprite);
	}
}
