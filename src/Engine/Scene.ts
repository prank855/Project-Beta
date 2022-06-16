import { GameObject } from './GameObject';
import { Logger } from './Util/Logger';
import { SerializedGameObject } from './SerializedGameObject';
import { LogColor } from './Types/LogColor';

export class Scene {
	/** Name of this Scene */
	private name: string;

	/** Holds GameObjects within this scene */
	private gameObjects: GameObject[] = [];

	/** Holds a map of GameObject id's to its corresponding GameObject */
	private gameObjectFromID = new Map<number, GameObject>();

	/** Holds GameObjects that will be removed next update */
	private removeQueue: GameObject[] = [];
	constructor(sceneName: string) {
		this.name = sceneName;
	}

	public get getName() {
		return this.name;
	}

	/** Calls every frame */
	update() {
		for (let go of this.removeQueue) {
			this.gameObjects.splice(this.gameObjects.indexOf(go), 1);
			this.gameObjectFromID.delete(go.getID);
		}
		this.removeQueue = [];
		for (let go of this.gameObjects) {
			if (go.enabled) {
				if (!go.started) {
					go.start();
					go.started = true;
				}
				go.update();
			}
		}
	}

	/** Adds a GameObject to this scene */
	addGameObject(go: GameObject) {
		go.sceneReference = this;
		this.gameObjects.push(go);
		this.gameObjectFromID.set(go.getID, go);
		Logger.log(
			`Added ${LogColor.GAMEOBJECT}GameObject ID: ${go.getID} ${LogColor.DEFAULT}"${go.name}"${LogColor.CLEAR}`
		);
	}

	/** Removes a GameObject from this scene by next update */
	removeGameObject(goID: number) {
		for (let go of this.gameObjects) {
			if (go.getID == goID) {
				this.removeQueue.push(go);
				return;
			}
		}
	}

	/** Returns list of GameObjects within scene */
	get getGameObjects(): GameObject[] {
		return this.gameObjects;
	}

	getGameObjectByName(name: string): GameObject {
		throw new Error(`Not implemented`);
	}
	getGameObjectByID(id: number): GameObject {
		// the ! assures that a real gameobject will return
		return this.gameObjectFromID.get(id)!;
	}
	getGameObjectsByName(name: string): GameObject[] {
		throw new Error(`Not implemented`);
	}
	getGameObjectsByID(): GameObject[] {
		throw new Error(`Not implemented`);
	}

	/** Recursive operation that returns the amount of GameObjects within scene including all sub-children */
	getGameObjectAmount(gos?: GameObject[], count?: { value: number }): number {
		if (!gos) {
			gos = this.gameObjects;
		}
		if (!count) {
			count = { value: 0 };
		}
		for (let go of gos) {
			count.value++;
			if (go.getChildren.length > 0) {
				this.getGameObjectAmount(go.getChildren, count);
			}
		}
		return count.value;
	}

	serialize(): { gameObjects: SerializedGameObject[] } {
		let serialized: { gameObjects: SerializedGameObject[] } = {
			gameObjects: [],
		};
		for (let go of this.gameObjects) {
			serialized.gameObjects.push(go.serialize());
		}
		return serialized;
	}
}
