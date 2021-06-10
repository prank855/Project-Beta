import { Engine } from '../Engine/Engine';
import { Environment } from '../Engine/Environment';
import { GameObject } from '../Engine/GameObject';
import { Scene } from '../Engine/Scene';
import { Time } from '../Engine/systems/Time';
import { AssetType } from './AssetType';
import { SimpleMovement } from './components/SimpleMovement';
import { SpriteRenderer } from './components/SpriteRenderer';
import { AssetSystem } from './systems/AssetSystem';
import { CameraSystem } from './systems/CameraSystem';
import { InputSystem } from './systems/InputSystem';
import { RendererSystem } from './systems/RendererSystem';
import { ScreenSystem } from './systems/ScreenSystem';

window.onload = () => {
	//Entry point for Client
	console.log(
		'%cFind project at: https://github.com/prank855/Project-Beta',
		'background: #222; color: #bada55'
	);

	var engine = new Engine();
	engine.environment = Environment.CLIENT;

	//TODO: add environment checks to game component, system, etc
	engine.addSystem(Time);
	engine.addSystem(InputSystem);
	engine.addSystem(ScreenSystem);
	engine.addSystem(AssetSystem);
	engine.addSystem(CameraSystem);
	engine.addSystem(RendererSystem);

	engine
		.getSystem(AssetSystem)
		.loadAsset('Trollface', 'trollface.png', AssetType.Image);

	var epicScene = new Scene();
	epicScene.name = 'Epic Scene';
	engine.addScene(epicScene);

	{
		var go = new GameObject();
		go.addComponent(SimpleMovement);
		go.addComponent(SpriteRenderer);
		go.getComponent(SpriteRenderer).setSprite('Trollface');
		go.getComponent(SpriteRenderer).sprite.pixelPerUnit = 32;
		epicScene.addGameObject(go);
	}
	{
		var go = new GameObject();
		go.addComponent(SpriteRenderer);
		go.getComponent(SpriteRenderer).setSprite('Trollface');
		go.getComponent(SpriteRenderer).sprite.pixelPerUnit = 32;
		epicScene.addGameObject(go);
	}

	engine.setScene('Epic Scene');
	engine.start();
};
