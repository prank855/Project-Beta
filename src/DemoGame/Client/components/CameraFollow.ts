import { GlobalInput } from '../../../Engine/Client/Systems/GlobalInput';
import { Viewport } from '../../../Engine/Client/Systems/Viewport';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Time } from '../../../Engine/Systems/Time';

export class CameraFollow extends GameComponent {
	private target: GameObject | undefined;
	private camera: Viewport | undefined;
	speed: number = 1;
	allowZoom: boolean = true;
	override init(): void {
		this.camera = Engine.instance.getSystem(Viewport);
		if (this.parent) {
			this.target = this.parent;
		}
	}
	override update(): void {
		if (this.target && this.camera) {
			this.Follow();
			if (this.allowZoom) this.Zoom();
		}
	}

	private Follow() {
		if (Time.deltaTime < 1) {
			let deltaX =
				(this.parent.transform.position.x + 0.5 - this.camera!.position.x) *
				Time.deltaTime;
			this.camera!.position.x += deltaX * this.speed;

			let deltaY =
				(this.parent.transform.position.y + 0.5 - this.camera!.position.y) *
				Time.deltaTime;
			this.camera!.position.y += deltaY * this.speed;
		}
	}
	private Zoom() {
		let keys = GlobalInput.getKeys();
		if (keys.includes('ArrowUp')) {
			Engine.instance.getSystem(Viewport).zoom *=
				Math.E ** (Time.deltaTime * Math.log(1.5));
		}
		if (keys.includes('ArrowDown')) {
			Engine.instance.getSystem(Viewport).zoom /=
				Math.E ** (Time.deltaTime * Math.log(1.5));
		}
	}

	setTarget(targetGO: GameObject) {
		this.target = targetGO;
	}
}
