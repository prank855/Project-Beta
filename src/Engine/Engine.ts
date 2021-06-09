import { Scene } from './Scene';
import { System } from './System';

export class Engine {
	systems: System[] = [];
	private scenes: Scene[] = [];
	private currentScene: Scene = new Scene();

	start() {
		console.log(`Scene name is "${this.currentScene.name}"`);

		for (var s of this.systems) {
			s.start();
		}

		this.loop();
	}

	private loop() {
		for (var s of this.systems) {
			s.update();
		}

		this.currentScene.update();

		var self = this;
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
