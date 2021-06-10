import { System } from '../../Engine/System';

export class InputSystem extends System {
	keys: string[] = [];

	init() {
		window.addEventListener('keydown', (e) => {
			for (let i = 0; i < this.keys.length; i++) {
				if (this.keys[i] == e.key) {
					return;
				}
			}
			console.log(e.key);
			this.keys.push(e.key);
		});
		window.addEventListener('keyup', (e) => {
			for (let i = 0; i < this.keys.length; i++) {
				if (this.keys[i] == e.key) {
					this.keys.splice(i, 1);
					return;
				}
			}
		});

		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				//this.mouseDown = false;
				this.keys = [];
				//this.mousePos = new Vector2(-50, -50);
			}
		});
	}

	start() {}
	update() {}
}
