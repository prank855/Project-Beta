import { System } from '../../System';
import { Vector2 } from '../../Types/Vector2';

/** Handles position and actions of camera view */
export class Viewport extends System {
	position: Vector2 = new Vector2();
	zoom: number = 1;

	/* Amount of units across either direction the camera can see at default zoom */
	unitsAcross: number = 32;

	private _currSpriteZoom: number = 0;
	get currSpriteZoom() {
		return this._currSpriteZoom;
	}

	private updateSpriteZoom() {
		let min = 0;
		if (window.innerHeight < window.innerWidth) {
			min = innerHeight;
		} else {
			min = innerWidth;
		}
		this._currSpriteZoom = this.zoom * (min / this.unitsAcross);
	}

	toScreenSpace(vec: Vector2): Vector2 {
		return new Vector2(
			vec.x * this._currSpriteZoom -
				this.position.x * this._currSpriteZoom +
				window.innerWidth / 2,
			-vec.y * this._currSpriteZoom +
				this.position.y * this._currSpriteZoom +
				window.innerHeight / 2
		);
	}

	init() {}
	start() {}
	update() {}
	override lateUpdate(): void {
		this.updateSpriteZoom();
	}
}
