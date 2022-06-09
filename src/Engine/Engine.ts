import { Scene } from './Scene';
import { System } from './System';
import { Time } from './Systems/Time';
import { LogColor } from './Types/LogColor';
import { Environment } from './Types/Environment';
import { Logger } from './Util/Logger';

export class Engine {
	public static instance: Engine;
	private environment: Environment | undefined;
	private systems: System[] = [];
	private scenes: Scene[] = [];
	private currentScene: Scene = new Scene('null scene');

	private framerate = 60;
	private frame: number = 0;

	set FrameRate(fps: number) {
		if (fps < 0) {
			fps = 0;
		}
		this.framerate = fps;
	}

	get Frame() {
		return this.frame;
	}

	constructor(environment: Environment) {
		if (Engine.instance != null) {
			return;
		}
		this.environment = environment;
		Engine.instance = this;
		this.addSystem(Time);
		this.registerEngineComponents();
	}

	/** Starts the engine */
	start() {
		//TODO: check if engine is not already running
		Logger.log(
			`Started ENGINE with Scene: ${LogColor.SCENE}"${this.currentScene.Name}"${LogColor.CLEAR}`
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

		if (this.framerate == 0 && this.environment == Environment.WEB) {
			requestAnimationFrame(self.loop.bind(this));
		} else if (this.framerate == 0) {
			throw new Error('You cannot have 0 FPS within a Node Environment');
		} else {
			setImmediate(self.loop.bind(this));
		}
	}

	/** Adds system to Engine */
	addSystem<T extends System>(type: new () => T): T {
		var temp = new type();
		Logger.log(`Added System: ${LogColor.SYSTEM}${type.name}${LogColor.CLEAR}`);
		temp.init();
		this.systems.push(temp);
		return temp;
	}

	/** Retrieves existing System */
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

	get CurrentScene() {
		return this.currentScene;
	}

	setScene(sceneName: string) {
		for (var s of this.scenes) {
			if (s.Name == sceneName) {
				this.currentScene = s;
				return;
			}
		}
	}
}
