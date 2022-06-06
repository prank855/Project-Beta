import { SpriteRenderer } from '../../../Client/components/SpriteRenderer';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Vector2 } from '../../../Engine/Vector2';
import { ChunkRenderer } from './ChunkRenderer';
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
		console.warn(`Fill Tiles`);
		for (var i = 0; i < this.size * this.size; i++) {
			this.tiles[i] = this.CreateTile();
		}
	}

	private CreateTile(): Tile {
		var tile = new Tile();
		return tile;
	}
}
