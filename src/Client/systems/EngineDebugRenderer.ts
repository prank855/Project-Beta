import { Engine } from '../../Engine/Engine';
import { GameObject } from '../../Engine/GameObject';
import { Scene } from '../../Engine/Scene';
import { System } from '../../Engine/System';
import { Time } from '../../Engine/systems/Time';
import { RendererSystem } from './RendererSystem';

export class EngineDebugRenderer extends System {
	updateRate = 4;
	sceneBox = document.createElement('div');
	sceneBody = document.createElement('div');

	private isHovered: boolean = false;
	init(): void {
		this.setupViews();
	}
	setupViews() {
		this.sceneBox.appendChild(this.sceneBody);
		let style = this.sceneBody.style;
		style.backgroundColor = `rgba(.5,.5,.5,.5)`;
		style.position = 'absolute';
		style.top = `${0}px`;
		style.left = `${0}px`;
		style.color = 'White';
		document.body.appendChild(this.sceneBox);

		this.sceneBox.addEventListener('mouseenter', () => {
			this.isHovered = true;
		});
		this.sceneBox.addEventListener('mouseleave', () => {
			this.isHovered = false;
		});
	}
	start(): void {
		this.lastUpdate = Time.getCurrentTime();
		this.sceneReference = Engine.instance.getCurrentScene();
	}

	sceneReference: Scene | undefined;

	private lastUpdate = -1;
	update() {
		var curr = Time.getCurrentTime();
		if (curr - this.lastUpdate >= 1 / this.updateRate) {
			if (this.isHovered) return;
			this.sceneReference = Engine.instance.getCurrentScene();
			this.WriteSceneView();
			this.lastUpdate = curr;
		}
	}

	WriteSceneView() {
		if (!this.sceneReference) return;
		var scene = this.sceneReference;
		this.sceneBody.innerHTML = '';
		this.AddText(
			this.sceneBody,
			`FPS: ${Math.round((1 / Time.deltaTime + Number.EPSILON) * 100) / 100}`
		);
		this.AddText(
			this.sceneBody,
			`Draw Calls: ${Engine.instance.getSystem(RendererSystem).spriteCalls}`
		);
		this.AddText(
			this.sceneBody,
			`Game Objects: ${scene.getGameObjectAmount()}`
		);
		this.AddText(this.sceneBody, `Scene View "${scene.name}"`);
		for (var go of scene.getGameObjects()) {
			this.WriteGameObject(this.sceneBody, go, 1);
		}
	}

	WriteGameObject(root: Node, go: GameObject, padding: number) {
		if (go.children.length != 0) {
			// create collapsible list
			var details = document.createElement('details');
			var summary = document.createElement('summary');
			details.appendChild(summary);
			summary.innerHTML = go.name;
			if (go.children.length < 4) {
				details.open = true;
			} else {
				summary.style.paddingLeft = `${(padding - 1) * 16}px`;
				summary.innerHTML = `${go.name} +${go.children.length} children`;
			}
			var summaryText = document.createElement('div');
			details.appendChild(summaryText);
			this.addDiv(root, details);
			padding++;
			for (var child of go.children) {
				this.WriteGameObject(summaryText, child, padding);
			}
			padding--;
		} else {
			var line = this.AddGameObject(root, go, padding++);
			padding--;
		}
	}

	addDiv(root: Node, div: Node) {
		root.appendChild(div);
	}

	AddGameObject(
		root: Node,
		go: GameObject,
		padding: number = 0
	): HTMLDivElement {
		var textDiv = document.createElement('div');
		textDiv.style.paddingLeft = `${padding * 16}px`;
		textDiv.innerHTML = go.name;
		root.appendChild(textDiv);
		return textDiv;
	}
	AddText(root: Node, text: string) {
		var textDiv = document.createElement('div');
		textDiv.innerHTML = text;
		root.appendChild(textDiv);
	}
}