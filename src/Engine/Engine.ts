import { Environment } from './Environment';
import { Scene } from './Scene';
import { System } from './System';
import { Time } from './systems/Time';
import { Color } from './types/Color';

export class Engine {
	public static self: Engine;
	environment: Environment = Environment.NONE;
	systems: System[] = [];
	private scenes: Scene[] = [];
	private currentScene: Scene = new Scene();

	framerate = 60;
	frame: number = 0;

	constructor() {
		if (Engine.self != null) {
			return;
		}
		Engine.self = this;
	}

	start() {
		console.log(
			`Started ENGINE with Scene: ${Color.SCENE}"${this.currentScene.name}"`
		);

		for (var s of this.systems) {
			s.start();
		}

		this.loop();
	}

	private setTimeoutError: number = 2;
	private loop() {
		let currTime = Time.getCurrTime();
		let self = this;
		if (this.halts.length > 0) {
			setTimeout(
				self.loop.bind(this),
				1000 / this.framerate -
					((currTime - Time.lastTime) * 1000 + this.setTimeoutError)
			);
			return;
		}
		let tickDelta = 1 / this.framerate;
		if (this.framerate != 0) {
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
		this.frame++;

		for (var s of this.systems) {
			s.update();
		}

		this.currentScene.update();

		setImmediate(self.loop.bind(this));
	}

	addSystem<T extends System>(type: new () => T): T {
		var temp = new type();
		console.log(`Added System: ${Color.SYSTEM}${type.name}`);
		temp.init();
		this.systems.push(temp);
		return temp;
	}

	getSystem<T extends System>(type: new () => T): T {
		for (var s of this.systems) {
			if (s instanceof type) {
				return s;
			}
		}
		throw 'Could not find the System';
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

	halts: System[] = [];
	halt(system: System) {
		this.halts.push(system);
		console.log(`Engine Halted by ${Color.SYSTEM}${system.constructor.name}`);
	}
	unhalt(system: System) {
		this.halts.splice(this.halts.indexOf(system), 1);
		console.log(`Engine Unhalted by ${Color.SYSTEM}${system.constructor.name}`);
	}
}
