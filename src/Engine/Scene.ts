import { GameObject } from './GameObject';
import { Color } from './types/Color';

export class Scene {
	name: string = 'Untitled Scene';
	private gameObjects: GameObject[] = [];
	update() {
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
		console.log(`Added ${Color.GAMEOBJECT}GameObject ID: ${go.id}`);
	}
}
