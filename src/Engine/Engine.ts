import { DebugUtil } from './DebugUtil';
import { Environment } from './Environment';
import { Logger } from './Logger';
import { Scene } from './Scene';
import { System } from './System';
import { Time } from './systems/Time';
import { LogColor } from './types/LogColor';

export class Engine {
	public static instance: Engine;
	environment: Environment = Environment.NONE;
	systems: System[] = [];
	private scenes: Scene[] = [];
	private currentScene: Scene = new Scene('null scene');

	framerate = 60;
	frame: number = 0;

	constructor() {
		if (Engine.instance != null) {
			return;
		}
		Engine.instance = this;
		this.addSystem(Time);
		this.registerEngineComponents();
	}

	start() {
		Logger.log(
			`Started ENGINE with Scene: ${
				LogColor.SCENE
			}"${this.currentScene.getName()}"${LogColor.CLEAR}`
		);

		for (var s of this.systems) {
			s.start();
		}

		this.loop();
	}

	private registerEngineComponents() {}

	private loop() {
		let self = this;

		let currTime = Time.getCurrentTime();

		let tickDelta = 1 / this.framerate;
		if (this.framerate != 0) {
			var timeSinceLastFrame = currTime - Time.lastTime;
			if (timeSinceLastFrame <= tickDelta) {
				if (timeSinceLastFrame < tickDelta / 2) {
					setTimeout(self.loop.bind(this));
					return;
				}
				setImmediate(self.loop.bind(this));
				return;
			}
		}

		this.frame++;

		// update systems
		for (var s of this.systems) {
			s.update();
		}

		// update scene / game objects
		this.currentScene.update();

		// late update systems
		for (var s of this.systems) {
			s.lateUpdate();
		}

		if (this.framerate == 0) {
			requestAnimationFrame(self.loop.bind(this));
		} else {
			setImmediate(self.loop.bind(this));
		}
	}

	addSystem<T extends System>(type: new () => T): T {
		var temp = new type();
		Logger.log(`Added System: ${LogColor.SYSTEM}${type.name}${LogColor.CLEAR}`);
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
		throw `Could not find the System ${type}`;
	}

	addScene(scene: Scene) {
		this.scenes.push(scene);
	}

	getCurrentScene(): Scene {
		return this.currentScene;
	}

	setScene(sceneName: string) {
		for (var s of this.scenes) {
			if (s.getName() == sceneName) {
				this.currentScene = s;
				return;
			}
		}
	}
}
