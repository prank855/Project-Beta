import { System } from '../System';

export class EventSystem implements System {
	private static instance: EventSystem | undefined;
	init(): void {
		if (!EventSystem.instance) {
			EventSystem.instance = this;
		} else {
			throw new Error('Multiple instances of EventSystem');
		}
	}
	start(): void {}
	update(): void {}
	lateUpdate(): void {}

	static CreateEvent() {}
	static SubscribeToEvent() {}
	static CallEvent() {}
}
