import { Engine } from '../../Engine';
import { GameComponent } from '../../GameComponent';
import { SoundSystem } from '../Systems/SoundSystem';

export class AudioRenderer extends GameComponent {
	private renderer: SoundSystem | undefined;

	playCount: number = 0;

	soundSrc: string = '';
	volume: number = 1;

	//TODO: these
	loop: boolean = false;
	// should the sound play over itself if directed to play again?
	cascadeSound: boolean = false;

	override start() {
		if (Engine.instance.getSystem(SoundSystem)) {
			this.renderer = Engine.instance.getSystem(SoundSystem);
		} else {
			throw `Did not find Renderer System`;
		}
	}
	override update() {}
	play() {
		this.playCount++;
		if (this.volume > 1) {
			this.volume = 1;
		}
		if (this.volume < 0) {
			this.volume = 0;
		}
		if (this.renderer) {
			let temp = new Audio(this.soundSrc);
			temp.volume = this.volume;
			this.renderer.waves.push(temp);
		}
	}
}
