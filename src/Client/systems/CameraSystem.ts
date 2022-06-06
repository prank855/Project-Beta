import { System } from '../../Engine/System';
import { Vector2 } from '../../Engine/Vector2';

export class CameraSystem extends System {
	position: Vector2 = new Vector2();
	zoom: number = 2;
	size: number = 64;

	getZoom(): number {
		let min = 0;
		if (window.innerHeight < window.innerWidth) {
			min = innerHeight;
		} else {
			min = innerWidth;
		}
		return this.zoom * (min / this.size);
	}

	toScreenSpace(vec: Vector2): Vector2 {
		var temp = new Vector2();
		var currZoom = this.getZoom();
		temp.x =
			vec.x * currZoom - this.position.x * currZoom + window.innerWidth / 2;
		temp.y =
			-vec.y * currZoom + this.position.y * currZoom + window.innerHeight / 2;
		return temp;
	}

	init() {}
	start() {}
	update() {}
}
