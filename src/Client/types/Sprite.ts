import { Transform } from '../../Engine/types/Transform';
import { Vector2 } from '../../Engine/types/Vector2';

export class Sprite {
	image: HTMLCanvasElement | undefined;
	transform: Transform | undefined;
	pixelsPerUnit: number = 1;
	scale: number = 1;
	origin: Vector2 = new Vector2(0, 0);
}
