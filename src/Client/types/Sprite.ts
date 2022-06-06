import { Transform } from '../../Engine/Transform';
import { Vector2 } from '../../Engine/Vector2';

export class Sprite {
	image: HTMLCanvasElement | null = null;
	transform: Transform | null = null;
	pixelsPerUnit: number = 1;
	scale: number = 1;
	origin: Vector2 = new Vector2(0.5, 0.5);
}
