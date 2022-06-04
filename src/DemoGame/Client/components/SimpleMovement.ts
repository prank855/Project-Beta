import { AudioRenderer } from '../../../Client/components/AudioRenderer';
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
				if (keys.includes('ArrowUp')) {
					Engine.instance.getSystem(CameraSystem).zoom *=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
				if (keys.includes('ArrowDown')) {
					Engine.instance.getSystem(CameraSystem).zoom /=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
			}

			/*Camera Control*/ {
				Engine.instance.getSystem(CameraSystem).position.x +=
					(this.parent.transform.position.x -
						Engine.instance.getSystem(CameraSystem).position.x) *
					Time.deltaTime;

				Engine.instance.getSystem(CameraSystem).position.y +=
					(this.parent.transform.position.y -
						Engine.instance.getSystem(CameraSystem).position.y) *
					Time.deltaTime;
			}

			this.lastKeys = keys;
		}
	}
}
