import { GameObject } from './GameObject';
import { Logger } from './Util/Logger';

/** Handles storing components to retrieve via strings */
export class ComponentStore {
	private static components = new Map<string, Function>();

	static registered: string[] = [];

	static registerComponent(componentClass: new (parent: GameObject) => {}) {
		let className = new (componentClass as any)().constructor.name;
		if (this.registered.includes(className)) return;
		this.registered.push(className);
		if (this.components.has(className)) {
			Logger.log(`Already have ${className} stored`);
			return;
		}
		Logger.warn(`Added ${className} to ComponentStore`);
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
