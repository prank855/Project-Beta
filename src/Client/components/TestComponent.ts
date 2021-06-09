import { GameComponent } from '../../Engine/GameComponent';

export class TestComponent extends GameComponent {
	value: number = 0;
	delta: number = 0;
	start() {}
	update() {
		this.delta++;
	}
}
