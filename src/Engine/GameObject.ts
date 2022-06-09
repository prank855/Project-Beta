import { ComponentStore } from './ComponentStore';
import { GameComponent } from './GameComponent';
import { Logger } from './Logger';
import { SerializedGameObject } from './SerializedGameObject';
import { Transform } from './Transform';
import { LogColor } from './types/LogColor';
import { Vector2 } from './Vector2';

export class GameObject {
	static latestID = 0;
	private id: number;
	name: string;
	transform = new Transform();
	parent: GameObject | undefined;
	private components: GameComponent[] = [];
	private children: GameObject[] = [];

	started: boolean = false;

	constructor(name?: string | undefined) {
		this.id = GameObject.latestID++;
		this.name = name || `GameObject (${this.id})`;
	}

	get Children() {
		return this.children;
	}

	start() {
		for (var co of this.components) {
			co.start();
		}
		for (var go of this.children) {
			go.start();
		}
	}

	get ID() {
		return this.id;
	}

	serialize(): SerializedGameObject {
		var serialized = new SerializedGameObject();
		serialized.id = this.id;
		serialized.name = this.name;
		serialized.transform = this.transform;
		serialized.parent = this.parent?.id;
		serialized.components = [];
		for (var co of this.components) {
			serialized.components.push(co.serialize());
		}
		serialized.children = [];
		for (var child of this.children) {
			serialized.children.push(child.serialize());
		}
		return serialized;
	}

	update() {
		for (let co of this.components) {
			co.update();
		}
		for (let go of this.children) {
			if (!go.started) {
				go.start();
				go.started = true;
			}
			go.update();
		}
	}

	getWorldPosition(): Transform {
		if (this.parent == null) {
			return this.transform;
		}
		var tempTrans = new Transform();
		tempTrans.position = Vector2.Copy(
			this.parent.getWorldPosition().position
		).add(this.transform.position);
		return tempTrans;
	}

	addChild(go: GameObject) {
		go.parent = this;
		this.children.push(go);
	}

	getChildren(): GameObject[] {
		return this.children;
	}

	/*addComponent(co: GameComponent) {
		co.parent = this;
		this.components.push(co);
	}
	*/

	addComponent<T extends GameComponent>(
		type: new (parent: GameObject) => T
	): T {
		var tempComponent = new type(this);
		tempComponent.Enable();
		tempComponent.init();
		this.components.push(tempComponent);
		Logger.log(
			`Added Component ${LogColor.COMPONENT}${type.name}${LogColor.DEFAULT} to ${LogColor.GAMEOBJECT}GameObject ID: ${this.id} ${LogColor.DEFAULT}"${this.name}"${LogColor.CLEAR}`
		);
		return tempComponent;
	}

	addComponentFromString(componentName: string): GameComponent {
		var tempComponent = new (ComponentStore.getComponent(
			'ClientGameManager'
		) as typeof GameComponent)(this);
		tempComponent.Enable();
		tempComponent.init();
		this.components.push(tempComponent);
		Logger.log(
			`Added Component ${LogColor.COMPONENT}${
				(tempComponent as any).constructor.name
			}${LogColor.DEFAULT} to ${LogColor.GAMEOBJECT}GameObject ID: ${this.id} ${
				LogColor.DEFAULT
			}"${this.name}"${LogColor.CLEAR}`
		);
		return tempComponent;
	}

	getComponent<T extends GameComponent>(
		type: new (parent: GameObject) => T
	): T {
		for (var co of this.components) {
			if (co instanceof type) {
				return co;
			}
		}
		throw 'Could not find the GameComponent';
	}

	getComponents<T extends GameComponent>(type: new () => T): T[] {
		let a: T[] = [];
		for (var co of this.components) {
			if (co instanceof type) {
				a.push(co);
			}
		}
		if (a.length == 0) {
			throw `Could not find the GameComponents`;
		}
		return a;
	}

	removeComponent<T extends GameComponent>(type: new () => T): void {
		for (var co of this.components) {
			if (co instanceof type) {
				co.Disable();
				this.components.splice(this.components.indexOf(co), 1);
				return;
			}
		}
	}
}
