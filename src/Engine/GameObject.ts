import { getOriginalNode } from 'typescript';
import { ComponentStore } from './ComponentStore';
import { GameComponent } from './GameComponent';
import { Scene } from './Scene';
import { SerializedGameObject } from './SerializedGameObject';
import { LogColor } from './Types/LogColor';
import { Transform } from './Types/Transform';
import { Logger } from './Util/Logger';

export class GameObject {
	sceneReference!: Scene;
	static latestID = 0;
	private id: number;
	name: string;
	transform = new Transform();
	parent!: GameObject;
	private components: GameComponent[] = [];
	private children: GameObject[] = [];
	enabled: boolean = true;

	//TODO: move start logic into this class instead of system
	started: boolean = false;

	constructor(name?: string | undefined) {
		this.id = GameObject.latestID++;
		this.name = name || `GameObject (${this.id})`;
	}

	/** Returns all children GameObjects of this GameObject */
	get getChildren(): GameObject[] {
		return this.children;
	}

	/** Starts the GameObject and all of its Components */
	start() {
		for (let co of this.components) {
			co.start();
		}
		for (let go of this.children) {
			go.start();
		}
	}

	get getID() {
		return this.id;
	}

	serialize(): SerializedGameObject {
		let serialized = new SerializedGameObject();
		serialized.id = this.id;
		serialized.name = this.name;
		serialized.transform = this.transform;
		serialized.parent = this.parent?.id;
		serialized.components = [];
		for (let co of this.components) {
			serialized.components.push(co.serialize());
		}
		serialized.children = [];
		for (let child of this.children) {
			serialized.children.push(child.serialize());
		}
		return serialized;
	}

	/** Calls every frame */
	update() {
		for (let co of this.components) {
			if (co.isEnabled) {
				co.update();
			}
		}
		for (let go of this.children) {
			if (go.enabled) {
				if (!go.started) {
					go.start();
					go.started = true;
				}
				go.update();
			}
		}
	}

	/** Enabled this GameObject */
	Enable() {
		for (let go of this.children) {
			go.Enable();
		}
		for (let co of this.components) {
			co.Enable();
		}
	}

	/** Disables this GameObject */
	Disable() {
		for (let go of this.children) {
			go.Disable();
		}
		for (let co of this.components) {
			co.Disable();
		}
	}

	/** Returns world position */
	getWorldPosition(): Transform {
		if (!this.parent) {
			return this.transform;
		}
		let tempTrans = new Transform();
		tempTrans.position = this.parent
			.getWorldPosition()
			.position.Copy()
			.add(this.transform.position);
		return tempTrans;
	}

	/** Appends a child GameObject to this GameObject */
	addChild(go: GameObject) {
		go.parent = this;
		this.children.push(go);
	}

	/** Adds GameComponent to this GameObject */
	addComponent<T extends GameComponent>(
		type: new (parent: GameObject) => T
	): T {
		let tempComponent = new type(this);
		tempComponent.Enable();
		tempComponent.init();
		this.components.push(tempComponent);
		Logger.log(
			`Added Component ${LogColor.COMPONENT}${type.name}${LogColor.DEFAULT} to ${LogColor.GAMEOBJECT}GameObject ID: ${this.id} ${LogColor.DEFAULT}"${this.name}"${LogColor.CLEAR}`
		);
		return tempComponent;
	}

	/** Adds a GameComponent to this GameObject via name */
	addComponentFromString(componentName: string): GameComponent {
		let tempComponent = new (ComponentStore.getComponent(
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

	/** Finds and returns the first found GameComponent of type */
	getComponent<T extends GameComponent>(
		type: new (parent: GameObject) => T
	): T {
		for (let co of this.components) {
			if (co instanceof type) {
				return co;
			}
		}
		throw 'Could not find the GameComponent';
	}

	/** Finds and returns all GameComponents of type */
	getComponents<T extends GameComponent>(type: new () => T): T[] {
		let a: T[] = [];
		for (let co of this.components) {
			if (co instanceof type) {
				a.push(co);
			}
		}
		if (a.length == 0) {
			throw `Could not find the GameComponents`;
		}
		return a;
	}

	/** Removes GameComponent from this GameObject */
	removeComponent<T extends GameComponent>(type: new () => T): void {
		for (let co of this.components) {
			if (co instanceof type) {
				co.Disable();
				this.components.splice(this.components.indexOf(co), 1);
				return;
			}
		}
	}

	/** Removes this GameObject from scene */
	Remove() {
		throw new Error('GameObject.Remove() is not implemented yet');
	}
}
