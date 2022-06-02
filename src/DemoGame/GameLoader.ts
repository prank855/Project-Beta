import { Engine } from '../Engine/Engine';
import { Environment } from '../Engine/Environment';
import { GameObject } from '../Engine/GameObject';
import { Scene } from '../Engine/Scene';
import { Time } from '../Engine/systems/Time';
import { AudioRenderer } from '../Client/components/AudioRenderer';
import { SimpleMovement } from './components/SimpleMovement';
import { SpriteRenderer } from '../Client/components/SpriteRenderer';
import { AssetSystem } from '../Client/systems/AssetSystem';
import { CameraSystem } from '../Client/systems/CameraSystem';
import { ClientNetworking } from '../Client/systems/ClientNetworking';
import { InputSystem } from '../Client/systems/InputSystem';
import { RendererSystem } from '../Client/systems/RendererSystem';
import { ScreenSystem } from '../Client/systems/ScreenSystem';
import { SoundSystem } from '../Client/systems/SoundSystem';
import { AssetType } from '../Client/types/AssetType';

export class GameLoader {
	init() {
		var engine = new Engine();
		engine.environment = Environment.CLIENT;
		engine.framerate = 240;

		engine.addSystem(Time);
		engine.addSystem(InputSystem);
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

		var epicScene = new Scene();
		epicScene.name = 'Epic Scene';
		engine.addScene(epicScene);

		{
			var go = new GameObject();
			go.addComponent(SimpleMovement);
			go.addComponent(SpriteRenderer);

			go.addComponent(AudioRenderer);
			go.getComponent(AudioRenderer).soundSrc = 'poggers.wav';
			go.getComponent(AudioRenderer).volume = 0.2;

			go.getComponent(SpriteRenderer).setSprite('Trollface');
			go.getComponent(SpriteRenderer).sprite.pixelPerUnit = 32;
			epicScene.addGameObject(go);
		}

		{
			var go = new GameObject();
			let sr = go.addComponent(SpriteRenderer);
			sr.setSprite('Smiley');
			sr.sprite.pixelPerUnit = 4;
			epicScene.addGameObject(go);
		}

		engine.setScene('Epic Scene');
		engine.start();
	}
}
