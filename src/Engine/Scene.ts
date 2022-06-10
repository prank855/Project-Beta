import { GameObject } from './GameObject';
import { Logger } from './Util/Logger';
import { SerializedGameObject } from './SerializedGameObject';
import { LogColor } from './Types/LogColor';

export class Scene {
	/** Name of this Scene */
	private name: string;

	/** Holds GameObjects within this scene */
	private gameObjects: GameObject[] = [];

	/** Holds GameObjects that will be removed next update */
	private removeQueue: GameObject[] = [];
	constructor(sceneName: string) {
		this.name = sceneName;
	}

	public get Name() {
		return this.name;
	}

	/** Calls every frame */
	update() {
		for (var go of this.removeQueue) {
			this.gameObjects.splice(this.gameObjects.indexOf(go), 1);
		}
		this.removeQueue = [];
		for (var go of this.gameObjects) {
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
		Logger.log(
			`Added ${LogColor.GAMEOBJECT}GameObject ID: ${go.ID} ${LogColor.DEFAULT}"${go.name}"${LogColor.CLEAR}`
		);
	}

	/** Removes a GameObject from this scene by next update */
	removeGameObject(goID: number) {
		for (var go of this.gameObjects) {
			if (go.ID == goID) {
				this.removeQueue.push(go);
				return;
			}
		}
	}

	/** Returns list of GameObjects within scene */
	get GameObjects(): GameObject[] {
		return this.gameObjects;
	}

	getGameObjectByName(name: string): GameObject {
		throw new Error(`Not implemented`);
	}
	getGameObjectByID(): GameObject {
		throw new Error(`Not implemented`);
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
		for (var go of gos) {
			count.value++;
			if (go.Children.length > 0) {
				this.getGameObjectAmount(go.Children, count);
			}
		}
		return count.value;
	}

	serialize(): { gameObjects: SerializedGameObject[] } {
		var serialized: { gameObjects: SerializedGameObject[] } = {
			gameObjects: [],
		};
		for (var go of this.gameObjects) {
			serialized.gameObjects.push(go.serialize());
		}
		return serialized;
	}
}
