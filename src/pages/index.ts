import { DemoGameClientLoader } from '../DemoGame/Client/DemoGameClientLoader';

window.onload = () => {
	//Entry point for Client
	console.log(
		'%cFind project at: https://github.com/prank855/Project-Beta',
		'background: #222; color: #bada55'
	);

	let loader = new DemoGameClientLoader();
	loader.init();

	let githubTextbox = document.createElement('div');
	githubTextbox.id = 'Github Link Box';

	githubTextbox.style.position = 'absolute';
	githubTextbox.style.left = '0px';
	githubTextbox.style.bottom = '0px';
	githubTextbox.style.backgroundColor = 'rgba(.5,.5,.5,.5)';

	let githubLink = document.createElement('a');
	githubLink.innerHTML = 'View Code Repository';
	githubLink.href = 'https://github.com/prank855/Project-Beta/';
	githubLink.target = '_blank';
	githubLink.rel = 'noopener noreferrer';
	githubLink.style.color = 'White';
	githubLink.style.font = '20px Arial';

	githubTextbox.appendChild(githubLink);

	document.body.appendChild(githubTextbox);
};
