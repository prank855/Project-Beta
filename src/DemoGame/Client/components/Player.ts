import { SpriteRenderer } from '../../../Client/components/SpriteRenderer';
import { GameComponent } from '../../../Engine/GameComponent';
import { SimpleMovement } from './SimpleMovement';

export class Player extends GameComponent {
	init(): void {
		let sr = this.parent.addComponent(SpriteRenderer);
		sr.setSprite('Player');
		sr.sprite.pixelsPerUnit = 32;
		this.parent.addComponent(SimpleMovement);
	}
	start(): void {}
	update(): void {}
}
