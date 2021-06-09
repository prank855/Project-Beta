import { Scene } from './Scene';
import { System } from './System';
import { Time } from './systems/Time';

export class Engine {
	systems: System[] = [];
	private scenes: Scene[] = [];
	private currentScene: Scene = new Scene();

	framerate = 20;

	start() {
		console.log(`Scene name is "${this.currentScene.name}"`);

		for (var s of this.systems) {
			s.start();
		}

		this.loop();
	}

	private setTimeoutError: number = 2;
	private loop() {
		let currTime = Time.getCurrTime();
		let self = this;
		let tickDelta = 1 / this.framerate;
		if (this.framerate > 4) {
			if (currTime - Time.lastTime < tickDelta) {
				if (
					currTime - Time.lastTime + this.setTimeoutError / 1000 <
					tickDelta
				) {
					setTimeout(
						self.loop.bind(this),
						1000 / this.framerate -
							((currTime - Time.lastTime) * 1000 + this.setTimeoutError)
					);
				} else {
					setImmediate(self.loop.bind(this));
				}
				return;
			}
		}

		for (var s of this.systems) {
			s.update();
		}

		console.log(1 / Time.deltaTime);

		this.currentScene.update();

		setImmediate(self.loop.bind(this));
	}

	addSystem<T extends System>(type: new () => T): T {
		var temp = new type();
		console.log(`Added System: ${type.name}`);
		temp.init();
		this.systems.push(temp);
		return temp;
	}

	addScene(scene: Scene) {
		this.scenes.push(scene);
	}

	setScene(sceneName: string) {
		for (var s of this.scenes) {
			if (s.name == sceneName) {
				this.currentScene = s;
				return;
			}
		}
	}
}
