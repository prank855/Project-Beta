import { GameComponent } from '../../Engine/GameComponent';
import { Time } from '../../Engine/systems/Time';

export class TestComponent extends GameComponent {
	value: number = 0;
	delta: number = 0;
	start() {}
	update() {
		this.delta++;
		if (this.parent) {
			this.parent.transform.position.x += Time.deltaTime * 20;
			this.parent.transform.position.y -= Time.deltaTime * 20;
		}
	}
}
