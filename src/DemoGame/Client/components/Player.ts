import { SpriteRenderer } from '../../../Client/components/SpriteRenderer';
import { Origin } from '../../../Client/types/Origin';
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
