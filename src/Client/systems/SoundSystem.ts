import { System } from '../../Engine/System';

export class SoundSystem extends System {
	waves: HTMLAudioElement[] = [];
	init() {}
	start() {}
	update() {
		for (var w of this.waves) {
			if (w) {
				w.play();
			}
		}
		this.waves.length = 0;
	}
}
