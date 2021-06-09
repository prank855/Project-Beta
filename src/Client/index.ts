import { Engine } from '../Engine/Engine';
import { GameObject } from '../Engine/GameObject';
import { Scene } from '../Engine/Scene';
import { Time } from '../Engine/systems/Time';
import { TestComponent } from './components/TestComponent';
import { CameraSystem } from './systems/CameraSystem';
import { RendererSystem } from './systems/RendererSystem';
import { ScreenSystem } from './systems/ScreenSystem';

window.onload = () => {
	//Entry point for Client
	console.log(
		'%cFind project at: https://github.com/prank855/Project-Beta',
		'background: #222; color: #bada55'
	);

	var engine = new Engine();
	engine.addSystem(Time);
	engine.addSystem(ScreenSystem);
	engine.addSystem(CameraSystem);
	engine.addSystem(RendererSystem);

	var epicScene = new Scene();
	epicScene.name = 'Epic Scene';
	engine.addScene(epicScene);

	var go = new GameObject();
	go.addComponent(TestComponent);
	epicScene.addGameObject(go);

	engine.setScene('Epic Scene');
	engine.start();
};
