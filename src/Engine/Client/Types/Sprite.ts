import { Transform } from '../../Types/Transform';
import { Vector2 } from '../../Types/Vector2';
import { Origin } from './Origin';

export class Sprite {
	/** Raw image of Sprite */
	image: HTMLCanvasElement | undefined;
	/** Transform of Sprite */
	transform: Transform | undefined;
	/** How many pixels fit into a game unit */
	pixelsPerUnit: number = 1;
	/** Scale of sprite */
	scale: number = 1;
	/** Origin of sprite relative to [0-1] */
	origin: Vector2 = Origin.BOTTOM_LEFT;
}
