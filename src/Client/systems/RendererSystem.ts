import { Engine } from '../../Engine/Engine';
import { System } from '../../Engine/System';
import { ScreenSystem } from './ScreenSystem';

export class RendererSystem extends System {
	screenSystem: ScreenSystem | null = null;
	init() {
		this.screenSystem = Engine.self.getSystem(ScreenSystem);
	}
	start() {}
	update() {
		if (this.screenSystem) {
			if (this.screenSystem.context) {
				//Clear Screen
				this.screenSystem.context.fillStyle = 'Blue';
				this.screenSystem.context.fillRect(0, 0, innerWidth, innerHeight);

				//Draw Sprites

				//Draw GUI

				//Draw Cursor
			}
		}
	}
}
