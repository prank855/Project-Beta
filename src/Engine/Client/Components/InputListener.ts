import { GameComponent } from '../../GameComponent';
import { GlobalInput } from '../Systems/GlobalInput';

export class InputListener extends GameComponent {
	override update(): void {
		// check if current flag
		for (var co of this.parent.getAllComponents()) {
			if ((co as any).OnInput) {
				(co as any).OnInput(GlobalInput.getKeys());
			}
		}
	}
}
