import { GameObject } from './GameObject';
import { SerializedGameObject } from './SerializedGameObject';
import { LogColor } from './types/LogColor';

export class Scene {
	private name: string;
	private gameObjects: GameObject[] = [];
	private removeQueue: GameObject[] = [];
	constructor(sceneName: string) {
		this.name = sceneName;
	}
	getName() {
		return this.name;
	}
	update() {
		for (var go of this.removeQueue) {
			this.gameObjects.splice(this.gameObjects.indexOf(go), 1);
		}
		this.removeQueue = [];
		for (var go of this.gameObjects) {
			if (!go.started) {
				go.start();
				go.started = true;
			}
			go.update();
		}
	}

	addGameObject(go: GameObject) {
		this.gameObjects.push(go);
		console.log(
			`Added ${LogColor.GAMEOBJECT}GameObject ID: ${go.id} ${LogColor.DEFAULT}"${go.name}"${LogColor.CLEAR}`
		);
	}

	removeGameObject(goID: number) {
		for (var go of this.gameObjects) {
			if (go.id == goID) {
				this.removeQueue.push(go);
				return;
			}
		}
	}

	getGameObjects(): GameObject[] {
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

	getGameObjectAmount(gos?: GameObject[], count?: { value: number }): number {
		if (!gos) {
			gos = this.gameObjects;
		}
		if (!count) {
			count = { value: 0 };
		}
		for (var go of gos) {
			count.value++;
			if (go.getChildren().length != 0) {
				this.getGameObjectAmount(go.getChildren(), count);
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
