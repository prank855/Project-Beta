import { System } from '../System';

export class Time extends System {
	static lastTime: number = 0;
	static deltaTime: number = 0;
	static elapsedTime: number = 0;
	static getCurrentTime(): number {
		return performance.now() / 1000;
	}

	init() {
		Time.deltaTime = Time.getCurrentTime() - Time.lastTime;
		Time.lastTime = Time.getCurrentTime();
	}
	start() {}

	update() {
		Time.deltaTime = Time.getCurrentTime() - Time.lastTime;
		Time.lastTime = Time.getCurrentTime();
		Time.elapsedTime += Time.deltaTime;
	}
}
