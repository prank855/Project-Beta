import { getTextOfJSDocComment } from 'typescript';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Vector2 } from '../../../Engine/Vector2';
import { Chunk } from './Chunk';

export class World extends GameComponent {
	chunks: Chunk[] = [];
	init() {
		this.CreateChunk(new Vector2(0, 0));

		this.CreateChunk(new Vector2(1, 0));
		this.CreateChunk(new Vector2(0, 1));
		this.CreateChunk(new Vector2(1, 1));
	}
	start(): void {}
	update(): void {}
	private CreateChunk(position: Vector2): Chunk {
		var go = new GameObject();

		go.name = 'Chunk';
		var chunk = go.addComponent(Chunk);
		go.transform.position = new Vector2(
			position.x * chunk.size,
			position.y * chunk.size
		);
		this.chunks.push(chunk);
		this.parent.addChild(go);
		return chunk;
	}
}
