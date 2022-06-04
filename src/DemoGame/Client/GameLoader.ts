import { Engine } from '../../Engine/Engine';
import { Environment } from '../../Engine/Environment';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { SpriteRenderer } from '../../Client/components/SpriteRenderer';
import { AssetSystem } from '../../Client/systems/AssetSystem';
import { CameraSystem } from '../../Client/systems/CameraSystem';
import { ClientNetworking } from '../../Client/systems/ClientNetworking';
import { Input } from '../../Client/systems/Input';
import { RendererSystem } from '../../Client/systems/RendererSystem';
import { ScreenSystem } from '../../Client/systems/ScreenSystem';
import { SoundSystem } from '../../Client/systems/SoundSystem';
import { AssetType } from '../../Client/types/AssetType';
import { ClientGameManager } from './components/GameManager';

export class GameLoader {
	init() {
		var engine = new Engine();
		engine.environment = Environment.CLIENT;
		engine.framerate = 200;

		engine.addSystem(Input);
		engine.addSystem(SoundSystem);
		engine.addSystem(ScreenSystem);
		engine.addSystem(AssetSystem);
		engine.addSystem(CameraSystem);
		engine.addSystem(RendererSystem);
		engine.addSystem(ClientNetworking);

		engine.getSystem(RendererSystem).clearColor = 'Blue';

		let assetSystem = engine.getSystem(AssetSystem);
		assetSystem.addAsset('Trollface', 'trollface.png', AssetType.Image);
		assetSystem.addAsset('Smiley', 'smiley.png', AssetType.Image);

		let camSys = engine.getSystem(CameraSystem);
		camSys.zoom = 1 / 2;

		var clientScene = new Scene();
		clientScene.name = 'Client Scene';
		engine.addScene(clientScene);

		{
			var gameManager = new GameObject();
			gameManager.name = 'Client Game Manager';
			gameManager.addComponent(ClientGameManager);
			clientScene.addGameObject(gameManager);
		}

		/*
		{
			var go = new GameObject();
			go.name = 'Player';

			go.addComponent(Player);

			go.addComponent(SimpleMovement);
			let sr = go.addComponent(SpriteRenderer);

			let ar = go.addComponent(AudioRenderer);
			ar.soundSrc = 'poggers.wav';
			ar.volume = 0.2;

			sr.setSprite('Trollface');
			sr.sprite.pixelPerUnit = 32;
			ClientGameManager.instance?.setPlayer(go.getComponent(Player));
			clientScene.addGameObject(go);
		}
		*/

		{
			var go = new GameObject();
			go.name = 'Smiley';
			let sr = go.addComponent(SpriteRenderer);
			sr.setSprite('Smiley');
			sr.sprite.pixelPerUnit = 4;
			clientScene.addGameObject(go);
		}

		engine.setScene('Client Scene');
		engine.start();
	}
}
