import { GameObject } from './GameObject';

export class Scene {
	name: string = 'Untitled Scene';
	private gameObjects: GameObject[] = [];
	update() {
		for (var go of this.gameObjects) {
			go.update();
		}
	}

	addGameObject(go: GameObject) {
		this.gameObjects.push(go);
	}
}
