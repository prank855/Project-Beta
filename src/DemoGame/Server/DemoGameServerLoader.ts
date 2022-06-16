import { Engine } from '../../Engine/Engine';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { ServerGameManager } from './components/ServerGameManager';
import { ServerNetworking } from '../../Engine/Server/Systems/ServerNetworking';
import { Environment } from '../../Engine/Types/Environment';

export class DemoGameServerLoader {
	constructor() {}
	init() {
		let engine = new Engine(Environment.NODE);
		engine.FrameRate = 10;

		let net = engine.addSystem(ServerNetworking);
		net.startServer(8080);

		let serverScene = new Scene('Server Scene');
		engine.addScene(serverScene);

		{
			let gameManager = new GameObject();
			gameManager.name = 'Server Game Manager';
			gameManager.addComponent(ServerGameManager);
			serverScene.addGameObject(gameManager);
		}

		engine.setScene('Server Scene');
		engine.start();
	}
}
