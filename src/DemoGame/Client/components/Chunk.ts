import { GameComponent } from '../../../Engine/GameComponent';
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
