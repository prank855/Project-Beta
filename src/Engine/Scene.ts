import { GameObject } from './GameObject';
import { LogColor } from './types/LogColor';

export class Scene {
	name: string = 'Untitled Scene';
	private gameObjects: GameObject[] = [];
	private removeQueue: GameObject[] = [];
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
}
