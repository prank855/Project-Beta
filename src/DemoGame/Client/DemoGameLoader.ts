import { Engine } from '../../Engine/Engine';
import { Environment } from '../../Engine/Environment';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { AssetSystem } from '../../Client/systems/AssetSystem';
import { CameraSystem } from '../../Client/systems/CameraSystem';
import { ClientNetworking } from '../../Client/systems/ClientNetworking';
import { Input } from '../../Client/systems/Input';
import { RendererSystem } from '../../Client/systems/RendererSystem';
import { ScreenSystem } from '../../Client/systems/ScreenSystem';
import { SoundSystem } from '../../Client/systems/SoundSystem';
import { AssetType } from '../../Client/types/AssetType';
import { ClientGameManager } from './components/ClientGameManager';
import { SceneViewRenderer } from '../../Client/systems/SceneViewRenderer';

export class DemoGameLoader {
	init() {
		var engine = new Engine();
		engine.environment = Environment.CLIENT;
		engine.framerate = 0;

		engine.addSystem(Input);
		engine.addSystem(SoundSystem);
		engine.addSystem(ScreenSystem);
		engine.addSystem(AssetSystem);
		engine.addSystem(CameraSystem);
		engine.addSystem(RendererSystem).clearColor = 'Blue';
		engine.addSystem(SceneViewRenderer);
		engine.addSystem(ClientNetworking);

		let assetSystem = engine.getSystem(AssetSystem);
		assetSystem.addAsset('Trollface', 'trollface.png', AssetType.Image);
		assetSystem.addAsset('Smiley', 'smiley.png', AssetType.Image);
		assetSystem.addAsset('Grass1', 'grass.png', AssetType.Image);
		assetSystem.addAsset('Player', 'Player.png', AssetType.Image);

		var clientScene = new Scene();
		clientScene.name = 'Client Scene';
		engine.addScene(clientScene);

		/*Create Game Manager*/ {
			var gameManager = new GameObject();
			gameManager.name = 'Client Game';
			gameManager.addComponent(ClientGameManager);
			clientScene.addGameObject(gameManager);
		}

		engine.setScene('Client Scene');
		engine.start();
	}
}
