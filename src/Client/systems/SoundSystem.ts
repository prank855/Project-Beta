import { System } from '../../Engine/System';

/** Handles sound */
export class SoundSystem extends System {
	waves: HTMLAudioElement[] = [];
	masterVolume: number = 1;
	init() {}
	start() {}
	update() {
		for (var w of this.waves) {
			if (w) {
				w.volume *= this.masterVolume;
				w.play();
			}
		}
		this.waves.length = 0;
	}
}
