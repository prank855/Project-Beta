import { Engine } from '../../Engine/Engine';
import { GameComponent } from '../../Engine/GameComponent';
import { SoundSystem } from '../systems/SoundSystem';

export class AudioRenderer extends GameComponent {
	private renderer: SoundSystem | null = null;
	soundSrc: string = '';
	volume: number = 1;
	start() {
		if (Engine.self.getSystem(SoundSystem)) {
			this.renderer = Engine.self.getSystem(SoundSystem);
		} else {
			throw `Did not find Renderer System`;
		}
	}
	update() {}
	play() {
		if (this.volume > 1) {
			this.volume = 1;
		}
		if (this.volume < 0) {
			this.volume = 0;
		}
		if (this.renderer) {
			var temp = new Audio(this.soundSrc);
			temp.volume = this.volume;
			this.renderer.waves.push(temp);
		}
	}
}
