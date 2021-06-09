import { System } from '../System';

export class Time extends System {
	private static lastTime: number = 0;
	static deltaTime: number = 0;
	init() {
		Time.lastTime = performance.now();
		Time.deltaTime = performance.now() - Time.lastTime;
	}
	start() {}
	update() {
		Time.deltaTime = performance.now() - Time.lastTime;
		Time.lastTime = performance.now();
	}
}
