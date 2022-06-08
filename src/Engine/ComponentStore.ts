import { GameObject } from './GameObject';

/** Handles storing components to retrieve via strings */
export class ComponentStore {
	private static components = new Map<string, Function>();

	static registered: string[] = [];

	static registerComponent(componentClass: new (parent: GameObject) => {}) {
		var className = new (componentClass as any)().constructor.name;
		if (this.registered.includes(className)) return;
		this.registered.push(className);
		if (this.components.has(className)) {
			console.log(`Already have ${className} stored`);
			return;
		}
		console.warn(`Added ${className} to ComponentStore`);
		this.components.set(className, componentClass);
	}
	static getComponent(componentName: string): Function {
		if (this.components.has(componentName)) {
			let co = this.components.get(componentName);
			if (co != null) return co;
		}
		throw new Error(`Please register ${componentName} to the ComponentStore`);
	}
	static hasComponent(componentName: string): boolean {
		return this.components.has(componentName);
	}
}
