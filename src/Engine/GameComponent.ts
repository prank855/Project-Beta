import { GameObject } from './GameObject';

export abstract class GameComponent {
	parent: GameObject | null = null;
	init() {}
	abstract start(): void;
	abstract update(): void;
}
