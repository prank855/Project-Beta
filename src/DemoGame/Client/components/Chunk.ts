import { SpriteRenderer } from '../../../Client/components/SpriteRenderer';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Vector2 } from '../../../Engine/Vector2';
import { Tile } from './Tile';

export class Chunk extends GameComponent {
	size: number = 16;
	tiles: Tile[] = [];
	init(): void {
		this.FillTiles();
	}
	start(): void {}
	update(): void {}

	private FillTiles() {
		console.warn(`asd`);
		for (var i = 0; i < this.size * this.size; i++) {
			this.tiles[i] = this.CreateTile(i % this.size, Math.floor(i / this.size));
		}
	}

	private CreateTile(x: number, y: number): Tile {
		var go = new GameObject();
		go.transform.position = new Vector2(x, y);
		go.name = 'Tile';
		var sr = go.addComponent(SpriteRenderer);
		sr.setSprite('Grass1');
		sr.sprite.pixelsPerUnit = 32;
		var tile = go.addComponent(Tile);
		this.parent.addChild(go);
		return tile;
	}
}
