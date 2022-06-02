import { Engine } from '../../Engine/Engine';
import { GameComponent } from '../../Engine/GameComponent';
import { Time } from '../../Engine/systems/Time';
import { CameraSystem } from '../../Client/systems/CameraSystem';
import { InputSystem } from '../../Client/systems/InputSystem';
import { AudioRenderer } from '../../Client/components/AudioRenderer';

export class SimpleMovement extends GameComponent {
	inputSystem: InputSystem | null = null;

	speed: number = 25;

	start() {
		this.inputSystem = Engine.self.getSystem(InputSystem);
	}
	private lastKeys: string[] = [];
	update() {
		if (this.inputSystem && this.parent) {
			var keys = this.inputSystem.getKeys();

			/*Play sound on space bar*/ {
				if (!this.lastKeys.includes(' ') && keys.includes(' ')) {
					this.parent.getComponent(AudioRenderer).play();
				}
			}

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
					Engine.self.getSystem(CameraSystem).zoom *=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
				if (keys.includes('ArrowDown')) {
					Engine.self.getSystem(CameraSystem).zoom /=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
			}

			/*Camera Control*/ {
				Engine.self.getSystem(CameraSystem).position.x +=
					(this.parent.transform.position.x -
						Engine.self.getSystem(CameraSystem).position.x) *
					Time.deltaTime;

				Engine.self.getSystem(CameraSystem).position.y +=
					(this.parent.transform.position.y -
						Engine.self.getSystem(CameraSystem).position.y) *
					Time.deltaTime;
			}

			this.lastKeys = keys;
		}
	}
}
