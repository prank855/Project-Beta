import { SpriteRenderer } from '../../../Engine/Client/Components/SpriteRenderer';
import { Origin } from '../../../Engine/Client/Types/Origin';
import { GameComponent } from '../../../Engine/GameComponent';
import { SimpleMovement } from './SimpleMovement';

export class Player extends GameComponent {
	override init(): void {
		let sr = this.parent.addComponent(SpriteRenderer);
		sr.setSprite('Player');
		sr.sprite.pixelsPerUnit = 32;
		sr.sprite.origin = Origin.BOTTOM_LEFT;
		this.parent.addComponent(SimpleMovement);
	}
}
