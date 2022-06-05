import { CameraSystem } from '../../../Client/systems/CameraSystem';
import { Input } from '../../../Client/systems/Input';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { Time } from '../../../Engine/systems/Time';

export class SimpleMovement extends GameComponent {
	inputSystem: Input | null = null;

	speed: number = 25;

	start() {}
	private lastKeys: string[] = [];
	update() {
		if (this.parent) {
			var keys = Input.getKeys();

			/** Movement */ {
				if (keys.includes('w')) {
					this.parent.transform.position.y += this.speed * Time.deltaTime;
				}
				if (keys.includes('s')) {
					this.parent.transform.position.y -= this.speed * Time.deltaTime;
				}
				if (keys.includes('d')) {
					this.parent.transform.position.x += this.speed * Time.deltaTime;
				}
				if (keys.includes('a')) {
					this.parent.transform.position.x -= this.speed * Time.deltaTime;
				}
			}

			/*Camera Control*/ {
				var camera = Engine.instance.getSystem(CameraSystem);

				var deltaX =
					(this.parent.transform.position.x - camera.position.x) *
					Time.deltaTime;
				camera.position.x += deltaX;

				var deltaY =
					(this.parent.transform.position.y - camera.position.y) *
					Time.deltaTime;
				camera.position.y += deltaY;

				if (keys.includes('ArrowUp')) {
					Engine.instance.getSystem(CameraSystem).zoom *=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
				if (keys.includes('ArrowDown')) {
					Engine.instance.getSystem(CameraSystem).zoom /=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
			}

			this.lastKeys = keys;
		}
	}
}
