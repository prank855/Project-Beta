export abstract class System {
	/** called when system is created */
	abstract init(): void;

	/** called when system is started */
	abstract start(): void;

	/** called every frame */
	abstract update(): void;

	/** called every frame after all normal updates */
	lateUpdate() {}
}
