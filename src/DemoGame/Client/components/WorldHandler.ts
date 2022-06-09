import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Logger } from '../../../Engine/Util/Logger';
import { Vector2 } from '../../../Engine/Types/Vector2';
import { Player } from './Player';
import { World } from './World';

export class WorldHandler extends GameComponent {
	world: World | undefined;
	player: Player | undefined;
	override serializedVars: string[] = ['world', 'player'];
	CreateWorld() {
		Logger.log(`Create World`);
		var worldGO = new GameObject('World');
		this.world = worldGO.addComponent(World);
		this.parent.addChild(worldGO);
		this.CreatePlayer();
	}
	CreatePlayer() {
		Logger.log(`Create Player`);
		var playerGO = new GameObject('Player');
		var player = playerGO.addComponent(Player);
		this.player = player;
		this.parent.addChild(playerGO);
	}
}
