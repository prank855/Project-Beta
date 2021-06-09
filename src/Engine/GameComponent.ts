import { GameObject } from './GameObject';

export abstract class GameComponent {
	parent: GameObject | null = null;
	abstract start(): void;
	abstract update(): void;
}
