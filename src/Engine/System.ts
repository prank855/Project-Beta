export abstract class System {
	/** called when system is initialized */
	abstract init(): void;

	/** called when system is started */
	abstract start(): void;

	/** called every frame */
	abstract update(): void;

	/** called after every frame */
	lateUpdate() {}
}
