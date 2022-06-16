import { GameComponent } from '../../../../Engine/GameComponent';
import { GameObject } from '../../../../Engine/GameObject';
import { Vector2 } from '../../../../Engine/Types/Vector2';
import { Logger } from '../../../../Engine/Util/Logger';
import { Player } from '../Player';
import { World } from './World';

export class WorldHandler extends GameComponent {
	world: World | undefined;
	player: Player | undefined;
	override serializedVars: string[] = ['world', 'player'];
	CreateWorld() {
		Logger.log(`Create World`);
		let worldGO = new GameObject('World');
		this.world = worldGO.addComponent(World);
		this.parent.addChild(worldGO);
		this.CreatePlayer();
	}
	CreatePlayer() {
		Logger.log(`Create Player`);
		let playerGO = new GameObject('Player');
		let player = playerGO.addComponent(Player);
		playerGO.transform.position = new Vector2(
			Math.random() * 10,
			Math.random() * 10
		);
		this.player = player;
		this.parent.addChild(playerGO);
	}
}
