import { Vector2 } from '../../Types/Vector2';

export class Origin {
	static readonly TOP_LEFT = new Vector2(0, 0);
	static readonly TOP_MID = new Vector2(0.5, 0);
	static readonly TOP_RIGHT = new Vector2(1, 0);
	static readonly MID_LEFT = new Vector2(0, 0.5);
	static readonly MIDDLE = new Vector2(0.5, 0.5);
	static readonly MID_RIGHT = new Vector2(1, 0.5);
	static readonly BOTTOM_LEFT = new Vector2(0, 1);
	static readonly BOTTOM_MID = new Vector2(0.5, 1);
	static readonly BOTTOM_RIGHT = new Vector2(1, 1);
}
