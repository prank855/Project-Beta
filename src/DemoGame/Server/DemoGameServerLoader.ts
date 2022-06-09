import { Engine } from '../../Engine/Engine';
import { Environment } from '../../Engine/Environment';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { ServerGameManager } from './components/ServerGameManager';
import { ServerNetworking } from '../../Server/systems/ServerNetworking';

export class DemoGameServerLoader {
	constructor() {}
	init() {
		var engine = new Engine(Environment.NODE);
		engine.FrameRate = 10;

		let net = engine.addSystem(ServerNetworking);
		net.startServer(8080);

		var serverScene = new Scene('Server Scene');
		engine.addScene(serverScene);

		{
			var gameManager = new GameObject();
			gameManager.name = 'Server Game Manager';
			gameManager.addComponent(ServerGameManager);
			serverScene.addGameObject(gameManager);
		}

		engine.setScene('Server Scene');
		engine.start();
	}
}
