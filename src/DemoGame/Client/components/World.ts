import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Vector2 } from '../../../Engine/Vector2';
import { Chunk } from './Chunk';
import { ChunkRenderer } from './ChunkRenderer';

export class World extends GameComponent {
	chunks: Chunk[] = [];
	serializedVars: string[] = ['chunks'];
	renderDistance: number = 8;
	init() {
		for (var x = -this.renderDistance; x < this.renderDistance + 1; x++) {
			for (var y = -this.renderDistance; y < this.renderDistance + 1; y++) {
				this.CreateChunk(new Vector2(x, y));
				console.log(x, y);
			}
		}
	}
	start(): void {}
	update(): void {}
	private CreateChunk(position: Vector2): Chunk {
		var go = new GameObject();

		go.name = `Chunk (${position.x}, ${position.y})`;
		var chunk = go.addComponent(Chunk);
		go.addComponent(ChunkRenderer);
		go.transform.position = new Vector2(
			position.x * chunk.size,
			position.y * chunk.size
		);
		this.chunks.push(chunk);
		this.parent.addChild(go);
		return chunk;
	}
}
