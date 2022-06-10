import { GameObject } from './GameObject';
import { SerializedComponent } from './SerializedComponent';

export class GameComponent {
	static latestID = 0;
	protected id: number;
	parent: GameObject;
	protected enabled: boolean = false;

	serializedVars: string[] = [];

	constructor(parent: GameObject) {
		this.id = GameComponent.latestID++;
		this.parent = parent;
	}
	/** Calls on GameComponent initialization */
	init(): void {}
	/** Calls on parent GameObject's start */
	start(): void {}
	/** Calls on every frame */
	update(): void {}
	/** Calls when GameComponent is enabled */
	onEnable(): void {}
	/** Calls when GameComponent is disabled */
	onDisable(): void {}

	get isEnabled(): boolean {
		return this.enabled;
	}
	get ID() {
		return this.id;
	}

	serialize(): SerializedComponent {
		var serialized = new SerializedComponent();
		serialized.name = (this as any).constructor.name;
		serialized.id = this.id;
		serialized.parentID = this.parent.ID;
		serialized.enabled = this.enabled;
		serialized.vars = new Map<string, any>();
		for (var str of this.serializedVars) {
			var variable = (this as any)[str];
			if (variable instanceof GameComponent!) {
				serialized.vars.set(str, (variable as GameComponent).serialize());
			} else if (variable instanceof GameObject) {
				serialized.vars.set(str, (variable as GameObject).serialize());
			} else {
				serialized.vars.set(str, variable);
			}
		}
		return serialized;
	}

	/** Enables Component */
	Enable() {
		this.enabled = true;
		this.onEnable();
	}

	/** Disables Component */
	Disable() {
		this.enabled = false;
		this.onDisable();
	}

	addComponent<T extends GameComponent>(
		type: new (parent: GameObject) => T
	): T {
		return this.parent.addComponent(type);
	}

	addComponentFromString(componentName: string): GameComponent {
		return this.parent.addComponentFromString(componentName);
	}

	getComponent<T extends GameComponent>(
		type: new (parent: GameObject) => T
	): T {
		return this.parent.getComponent(type);
	}

	getComponents<T extends GameComponent>(type: new () => T): T[] {
		return this.parent.getComponents(type);
	}

	removeComponent<T extends GameComponent>(type: new () => T): void {
		this.parent.removeComponent(type);
	}
}
