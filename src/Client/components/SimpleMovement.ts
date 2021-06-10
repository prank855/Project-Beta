import { Engine } from '../../Engine/Engine';
import { GameComponent } from '../../Engine/GameComponent';
import { Time } from '../../Engine/systems/Time';
import { CameraSystem } from '../systems/CameraSystem';
import { InputSystem } from '../systems/InputSystem';

export class SimpleMovement extends GameComponent {
	inputSystem: InputSystem | null = null;

	speed: number = 25;

	start() {
		this.inputSystem = Engine.self.getSystem(InputSystem);
	}
	update() {
		if (this.inputSystem && this.parent) {
			var keys = this.inputSystem.keys;
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
			Engine.self.getSystem(CameraSystem).position.x +=
				(this.parent.transform.position.x -
					Engine.self.getSystem(CameraSystem).position.x) *
				Time.deltaTime;

			Engine.self.getSystem(CameraSystem).position.y +=
				(this.parent.transform.position.y -
					Engine.self.getSystem(CameraSystem).position.y) *
				Time.deltaTime;
		}
	}
}
