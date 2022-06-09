import { Engine } from '../../Engine/Engine';
import { Environment } from '../../Engine/Environment';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { AssetSystem } from '../../Client/systems/AssetSystem';
import { Viewport } from '../../Client/systems/Viewport';
import { ClientNetworking } from '../../Client/systems/ClientNetworking';
import { Input } from '../../Client/systems/Input';
import { RendererSystem } from '../../Client/systems/RendererSystem';
import { ScreenSystem } from '../../Client/systems/ScreenSystem';
import { SoundSystem } from '../../Client/systems/SoundSystem';
import { AssetType } from '../../Client/types/AssetType';
import { ClientGameManager } from './components/ClientGameManager';
import { EngineDebugRenderer } from '../../Client/systems/EngineDebugRenderer';
import { ComponentStore } from '../../Engine/ComponentStore';

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
