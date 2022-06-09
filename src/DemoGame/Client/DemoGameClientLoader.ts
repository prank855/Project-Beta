import { Engine } from '../../Engine/Engine';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { AssetSystem } from '../../Engine/Client/Systems/AssetSystem';
import { Viewport } from '../../Engine/Client/Systems/Viewport';
import { ClientNetworking } from '../../Engine/Client/Systems/ClientNetworking';
import { Input } from '../../Engine/Client/Systems/Input';
import { RendererSystem } from '../../Engine/Client/Systems/RendererSystem';
import { ScreenSystem } from '../../Engine/Client/Systems/ScreenSystem';
import { SoundSystem } from '../../Engine/Client/Systems/SoundSystem';
import { AssetType } from '../../Engine/Client/Types/AssetType';
import { ClientGameManager } from './components/ClientGameManager';
import { EngineDebugRenderer } from '../../Engine/Client/Systems/EngineDebugRenderer';
import { ComponentStore } from '../../Engine/ComponentStore';
import { Environment } from '../../Engine/Types/Environment';

export class DemoGameClientLoader {
	init() {
		var engine = new Engine(Environment.WEB);
		engine.FrameRate = 0;

		engine.addSystem(Input);
		engine.addSystem(SoundSystem);
		engine.addSystem(ScreenSystem);
		engine.addSystem(AssetSystem);
		engine.addSystem(Viewport).unitsAcross = 20;
		engine.addSystem(RendererSystem).clearColor = 'Blue';
		engine.addSystem(EngineDebugRenderer);
		engine.addSystem(ClientNetworking);

		let assetSystem = engine.getSystem(AssetSystem);
		assetSystem.addAsset('Trollface', 'trollface.png', AssetType.Image);
		assetSystem.addAsset('Smiley', 'smiley.png', AssetType.Image);
		assetSystem.addAsset('Grass1', 'grass.png', AssetType.Image);
		assetSystem.addAsset('Player', 'Player.png', AssetType.Image);

		var clientScene = new Scene('Client Scene');
		engine.addScene(clientScene);

		ComponentStore.registerComponent(ClientGameManager);

		/*Create Game Manager*/ {
			var gameManager = new GameObject();
			gameManager.name = 'Client Game';
			gameManager.addComponentFromString('ClientGameManager');
			clientScene.addGameObject(gameManager);
		}

		engine.setScene('Client Scene');
		engine.start();
	}
}
