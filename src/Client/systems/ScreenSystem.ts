import { System } from '../../Engine/System';

/** Handles creation/retrieval canvas2d and drawing context */
export class ScreenSystem extends System {
	private canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D | null = null;
	constructor() {
		super();
		this.canvas = document.createElement('canvas');
	}
	init() {
		this.canvas.id = 'canvas';
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		window.addEventListener('resize', () => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		});
		document.body.appendChild(this.canvas);
		document
			.getElementById(this.canvas.id)
			?.addEventListener('contextmenu', (e) => {
				e.preventDefault();
			});
		document.body.style.overflow = 'hidden';
		document.body.style.margin = '0';
		//document.body.style.cursor = 'none';
		this.context = this.canvas.getContext('2d', { alpha: false });
	}
	get screenWidth() {
		if (!this.canvas) throw new Error('Canvas not found??');

		return this.canvas.width;
	}
	get screenHeight() {
		return this.canvas.height;
	}
	start() {}
	update() {}
}
