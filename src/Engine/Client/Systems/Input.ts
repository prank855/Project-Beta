import { System } from '../../System';

/** Handles client input */
export class Input extends System {
	private static keys: string[] = [];

	init() {
		window.addEventListener('keydown', (e) => {
			for (let i = 0; i < Input.keys.length; i++) {
				if (Input.keys[i] == e.key) {
					return;
				}
			}
			Input.keys.push(e.key);
		});
		window.addEventListener('keyup', (e) => {
			for (let i = 0; i < Input.keys.length; i++) {
				if (Input.keys[i] == e.key) {
					Input.keys.splice(i, 1);
					return;
				}
			}
		});

		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				Input.keys = [];
			}
		});
	}

	static getKeys(): string[] {
		let temp = [];
		for (let k of this.keys) {
			temp.push(k);
		}
		return temp;
	}

	static IsKeyDown(keyName: string): boolean {
		//TODO: implement
		return false;
	}

	static IsKeyUp(keyName: string): boolean {
		//TODO: implement
		return true;
	}

	static IsKeyHeld(keyName: string): boolean {
		//TODO: implement
		return false;
	}
	start() {}
	update() {}
}
