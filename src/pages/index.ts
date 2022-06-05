import { GameLoader } from '../DemoGame/Client/GameLoader';

window.onload = () => {
	//Entry point for Client
	console.log(
		'%cFind project at: https://github.com/prank855/Project-Beta',
		'background: #222; color: #bada55'
	);

	var loader = new GameLoader();
	loader.init();
};
