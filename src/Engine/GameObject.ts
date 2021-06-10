import { Color } from '../Client/COLOR';
import { GameComponent } from './GameComponent';
import { Transform } from './Transform';
import { Vector2 } from './Vector2';

export class GameObject {
	static latestID = 0;
	id: number;
	transform = new Transform();
	parent: GameObject | null = null;
	components: GameComponent[] = [];
	children: GameObject[] = [];

	started: boolean = false;

	constructor() {
		this.id = GameObject.latestID++;
	}

	start() {
		for (var co of this.components) {
			co.start();
		}
	}

	update() {
		for (var co of this.components) {
			co.update();
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

	/*addComponent(co: GameComponent) {
		co.parent = this;
		this.components.push(co);
	}
	*/

	addComponent<T extends GameComponent>(type: new () => T): T {
		var temp = new type();
		temp.parent = this;
		this.components.push(temp);
		console.log(
			`Added Component ${Color.COMPONENT}${type.name}${Color.DEFAULT} to ${Color.GAMEOBJECT}GameObject ID: ${this.id}`
		);
		return temp;
	}

	getComponent<T extends GameComponent>(type: new () => T): T {
		for (var co of this.components) {
			if (co instanceof type) {
				return co;
			}
		}
		throw 'Could not find the GameComponent';
	}
}
