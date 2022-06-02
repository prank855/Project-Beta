import { System } from '../../Engine/System';

export class Input extends System {
	private static keys: string[] = [];

	init() {
		window.addEventListener('keydown', (e) => {
			for (let i = 0; i < Input.keys.length; i++) {
				if (Input.keys[i] == e.key) {
					return;
				}
			}
			//console.log(e.key);
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
				//this.mouseDown = false;
				Input.keys = [];
				//this.mousePos = new Vector2(-50, -50);
			}
		});
	}

	static getKeys(): string[] {
		var temp = [];
		for (var k of this.keys) {
			temp.push(k);
		}
		return temp;
	}

	static IsKeyDown(): boolean {
		//TODO: implement
		return false;
	}

	static IsKeyUp(): boolean {
		//TODO: implement
		return true;
	}

	static IsKeyHeld(): boolean {
		//TODO: implement
		return false;
	}
	start() {}
	update() {}
}
