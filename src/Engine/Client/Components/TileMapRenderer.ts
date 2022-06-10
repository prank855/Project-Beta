import { textChangeRangeIsUnchanged } from 'typescript';
import { errorMonitor } from 'ws';
import { GameComponent } from '../../GameComponent';
import { Vector2 } from '../../Types/Vector2';
import { Sprite } from '../Types/Sprite';

export class SpriteArrayRenderer extends GameComponent {
	private sprites: Sprite[] = [];

	private width: number = 1;
	private height: number = 1;

	/** Width of SpriteArray Renderer */
	get Width() {
		return this.width;
	}
	/** Sets width of SpriteArray Renderer */
	set Width(value: number) {
		if (value < 0) value = 0;
		this.width = value;
	}
	/** Height of SpriteArray Renderer */
	get Height() {
		return this.height;
	}
	/** Sets height of SpriteArray Renderer */
	set Height(value: number) {
		if (value < 0) value = 0;
		this.height = value;
	}

	SetTiles(sprites: Sprite[]) {
		if (sprites.length != this.width * this.height) {
			throw new Error(
				`Must give an array of sprites the same length as SpriteArrayRenderer's size ${
					this.width * this.height
				}, you gave it ${sprites.length}`
			);
		}
		this.sprites = sprites;
	}

	SetTile(sprite: Sprite, position: Vector2) {
		var index = position.x + position.y * this.height;
		if (index > this.width * this.height) {
			throw new Error('Trying to set a Tile out of bounds');
		}
		this.sprites[index] = sprite;
	}

	GetTile(position: Vector2): Sprite {
		var index = position.x + position.y * this.height;
		return this.sprites[index];
	}

	override update(): void {
		//
	}

	//TODO: rest of this
}
