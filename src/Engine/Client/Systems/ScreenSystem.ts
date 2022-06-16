import { System } from '../../System';

/** Handles creation/retrieval canvas2d and drawing context */
export class ScreenSystem extends System {
	private canvas!: HTMLCanvasElement;
	private context!: CanvasRenderingContext2D;

	init() {
		this.canvas = document.createElement('canvas');
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
		this.context = this.canvas.getContext('2d', { alpha: false })!;
	}
	get getScreenWidth() {
		return this.canvas.width;
	}
	get getScreenHeight() {
		return this.canvas.height;
	}

	getCanvas() {
		return this.canvas;
	}

	getContext() {
		return this.context;
	}

	start() {}
	update() {}
}
