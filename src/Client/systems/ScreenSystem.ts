import { System } from '../../Engine/System';

export class ScreenSystem extends System {
	static canvas: HTMLCanvasElement;
	static context: CanvasRenderingContext2D | null;
	init() {
		let canvas = document.createElement('canvas');
		canvas.id = 'canvas';
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		window.addEventListener('resize', () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});
		document.body.appendChild(canvas);
		document.getElementById(canvas.id)?.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
		document.body.style.overflow = 'hidden';
		document.body.style.margin = '0';
		//document.body.style.cursor = 'none';
		ScreenSystem.canvas = canvas;
		ScreenSystem.context = canvas.getContext('2d', { alpha: false });
	}
	start() {}
	update() {}
}
