export abstract class System {
	abstract init(): void;
	abstract start(): void;
	abstract update(): void;
	lateUpdate() {}
}
