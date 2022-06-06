import { Engine } from '../../Engine/Engine';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { System } from '../../Engine/System';
import { ScreenSystem } from './ScreenSystem';

export class SceneViewRenderer extends System {
	screen: ScreenSystem | undefined;
	init(): void {}
	start(): void {
		this.screen = Engine.instance.getSystem(ScreenSystem);
	}
	update(): void {
		if (this.screen) {
			var ctx = this.screen.context;
			if (!ctx) return;
			var scene = Engine.instance.getCurrentScene();
			this.index = 0;
			this.childIndex = 0;
			ctx.fillStyle = 'White';
			ctx.fillRect(this.fontSize, this.padding - this.fontSize, 300, 200);
			this.RenderSceneText(scene, ctx);
		}
	}

	index = 0;
	childIndex = 0;
	fontSize = 20;
	padding = 100;
	font: string = 'Courier New';

	RenderSceneText(scene: Scene, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = 'Black';
		ctx.font = `${this.fontSize}px ${this.font}`;
		ctx.fillText(
			`${scene.name.toUpperCase()}`,
			this.fontSize + this.childIndex * this.fontSize,
			this.padding + this.fontSize * this.index
		);
		this.index++;
		this.childIndex++;
		for (var go of scene.getGameObjects()) {
			ctx.fillText(
				go.name,
				this.fontSize + this.childIndex * this.fontSize,
				this.padding + this.fontSize * this.index
			);
			for (var child of go.getChildren()) {
				this.RenderChildText(child, ctx);
			}
		}
	}

	RenderChildText(root: GameObject, ctx: CanvasRenderingContext2D) {
		this.index++;
		this.childIndex++;
		if (root.getChildren().length < 5) {
			ctx.fillText(
				root.name,
				this.fontSize + this.childIndex * this.fontSize,
				this.padding + this.fontSize * this.index
			);
			for (var c of root.getChildren()) {
				this.RenderChildText(c, ctx);
			}
		} else {
			ctx.fillText(
				`+${root.getChildren().length} children`,
				this.fontSize + this.childIndex * this.fontSize,
				this.padding + this.fontSize * this.index
			);
		}

		this.childIndex--;
	}
}
