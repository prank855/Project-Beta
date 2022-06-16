import { Viewport } from '../../../Engine/Client/Systems/Viewport';
import { Input } from '../../../Engine/Client/Systems/Input';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { Time } from '../../../Engine/Systems/Time';

export class SimpleMovement extends GameComponent {
	inputSystem: Input | undefined;

	speed: number = 2;
	private lastKeys: string[] = [];

	override start(): void {
		let camera = Engine.instance.getSystem(Viewport);
		camera.position = this.parent.transform.position.Copy();
	}

	override update() {
		if (this.parent) {
			let keys = Input.getKeys();

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
				let camera = Engine.instance.getSystem(Viewport);

				if (Time.deltaTime < 1) {
					let deltaX =
						(this.parent.transform.position.x + 0.5 - camera.position.x) *
						Time.deltaTime;
					camera.position.x += deltaX * 3;

					let deltaY =
						(this.parent.transform.position.y + 0.5 - camera.position.y) *
						Time.deltaTime;
					camera.position.y += deltaY * 3;
				}

				if (keys.includes('ArrowUp')) {
					Engine.instance.getSystem(Viewport).zoom *=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
				if (keys.includes('ArrowDown')) {
					Engine.instance.getSystem(Viewport).zoom /=
						Math.E ** (Time.deltaTime * Math.log(1.5));
				}
			}

			this.lastKeys = keys;
		}
	}
}
