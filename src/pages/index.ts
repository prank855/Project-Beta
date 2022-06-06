import { DemoGameLoader } from '../DemoGame/Client/DemoGameLoader';

window.onload = () => {
	//Entry point for Client
	console.log(
		'%cFind project at: https://github.com/prank855/Project-Beta',
		'background: #222; color: #bada55'
	);

	var loader = new DemoGameLoader();
	loader.init();
};
