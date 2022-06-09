import { System } from '../System';

/** Handles Time*/
export class Time extends System {
	static lastTime: number = 0;
	static deltaTime: number = 0;
	static elapsedTime: number = 0;
	static getCurrentTime(): number {
		return performance.now() / 1000;
	}

	init() {
		let curr = Time.getCurrentTime();
		Time.deltaTime = curr - Time.lastTime;
		Time.lastTime = curr;
	}
	start() {}

	update() {
		let curr = Time.getCurrentTime();
		Time.deltaTime = curr - Time.lastTime;
		Time.lastTime = curr;
		Time.elapsedTime += Time.deltaTime;
	}
}
