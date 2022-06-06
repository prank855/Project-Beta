import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Player } from './Player';
import { World } from './World';

export class WorldHandler extends GameComponent {
	start(): void {}
	update(): void {}

	world: World | undefined;
	player: Player | undefined;
	CreateWorld() {
		console.log(`Create World`);
		var worldGO = new GameObject('World');
		var world = worldGO.addComponent(World);
		this.parent.addChild(worldGO);
		this.CreatePlayer();
	}
	CreatePlayer() {
		console.log(`Create Player`);
		var go = new GameObject('Player');
		var player = go.addComponent(Player);
		this.player = player;
		this.parent.addChild(go);
	}
}
