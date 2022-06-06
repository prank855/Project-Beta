import { GameObject } from './GameObject';

export abstract class GameComponent {
	parent: GameObject;
	private enabled: boolean = false;
	constructor(parent: GameObject) {
		this.parent = parent;
	}
	init() {}
	abstract start(): void;
	abstract update(): void;
	onEnable(): void {}
	onDisable(): void {}

	isEnabled(): boolean {
		return this.enabled;
	}
	Enable() {
		this.enabled = true;
		this.onEnable();
	}
	Disable() {
		this.enabled = false;
		this.onDisable();
	}
}
