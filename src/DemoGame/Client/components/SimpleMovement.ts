import { Viewport } from '../../../Engine/Client/Systems/Viewport';
import { GlobalInput } from '../../../Engine/Client/Systems/GlobalInput';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { Time } from '../../../Engine/Systems/Time';
import { IInputListener } from '../../../Engine/Client/Components/IInputListener';
import { Vector2 } from '../../../Engine/Types/Vector2';
import { getPositionOfLineAndCharacter } from 'typescript';

export class SimpleMovement extends GameComponent implements IInputListener {
	inputSystem: GlobalInput | undefined;

	speed: number = 2;

	override start(): void {
		let camera = Engine.instance.getSystem(Viewport);
		camera.position = this.parent.transform.position.Copy();
	}

	OnInput(keys: string[]): void {
		var dir = new Vector2();
		if (keys.includes('w')) {
			dir.y += 1;
		}
		if (keys.includes('s')) {
			dir.y -= 1;
		}
		if (keys.includes('d')) {
			dir.x += 1;
		}
		if (keys.includes('a')) {
			dir.x -= 1;
		}

		dir = dir.Normalized;

		var pos = this.parent.transform.position;

		pos.x += dir.x * this.speed * Time.deltaTime;
		pos.y += dir.y * this.speed * Time.deltaTime;
	}
}
