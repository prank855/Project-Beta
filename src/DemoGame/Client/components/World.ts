import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Vector2 } from '../../../Engine/Vector2';
import { Chunk } from './Chunk';
import { ChunkRenderer } from './ChunkRenderer';

export class World extends GameComponent {
	chunks: Chunk[] = [];
	init() {
		var renderDistance = 4;
		for (var x = -renderDistance; x < renderDistance; x++) {
			for (var y = -renderDistance; y < renderDistance; y++) {
				this.CreateChunk(new Vector2(x, y));
			}
		}
	}
	start(): void {}
	update(): void {}
	private CreateChunk(position: Vector2): Chunk {
		var go = new GameObject();

		go.name = 'Chunk';
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
