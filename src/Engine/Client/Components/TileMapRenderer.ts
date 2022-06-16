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
	get getWidth() {
		return this.width;
	}
	/** Sets width of SpriteArray Renderer */
	set setWidth(value: number) {
		if (value < 0) value = 0;
		this.width = value;
	}
	/** Height of SpriteArray Renderer */
	get getHeight() {
		return this.height;
	}
	/** Sets height of SpriteArray Renderer */
	set setHeight(value: number) {
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
		let index = position.x + position.y * this.height;
		if (index > this.width * this.height) {
			throw new Error('Trying to set a Tile out of bounds');
		}
		this.sprites[index] = sprite;
	}

	GetTile(position: Vector2): Sprite {
		let index = position.x + position.y * this.height;
		return this.sprites[index];
	}

	override update(): void {
		//
	}

	//TODO: rest of this
}
