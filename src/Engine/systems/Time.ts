import { System } from '../System';

export class Time extends System {
	static lastTime: number = 0;
	static deltaTime: number = 0;
	static getCurrTime(): number {
		return performance.now() / 1000;
	}

	init() {
		Time.deltaTime = Time.getCurrTime() - Time.lastTime;
		Time.lastTime = Time.getCurrTime();
	}
	start() {}

	update() {
		Time.deltaTime = Time.getCurrTime() - Time.lastTime;
		Time.lastTime = Time.getCurrTime();
	}
}
