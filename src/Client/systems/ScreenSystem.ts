import { System } from '../../Engine/System';

export class ScreenSystem extends System {
	canvas: HTMLCanvasElement | null = null;
	context: CanvasRenderingContext2D | null = null;
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
		this.canvas = canvas;
		this.context = canvas.getContext('2d', { alpha: false });
	}
	start() {}
	update() {}
}
