import { GameObject } from './GameObject';
import { SerializedComponent } from './SerializedComponent';

export class GameComponent {
	parent: GameObject;
	private enabled: boolean = false;

	serializedVars: string[] = [];

	constructor(parent: GameObject) {
		this.parent = parent;
	}
	init(): void {}
	start(): void {}
	update(): void {}
	onEnable(): void {}
	onDisable(): void {}

	serialize(): SerializedComponent {
		var serialized = new SerializedComponent();
		serialized.name = (this as any).constructor.name;
		serialized.parentID = this.parent.id;
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
