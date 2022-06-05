import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { ServerNetworking } from '../../../Server/systems/ServerNetworking';

export class ServerGameManager extends GameComponent {
	static instance: ServerGameManager | null = null;
	private net: ServerNetworking | null = null;

	start(): void {
		if (ServerGameManager.instance == null) {
			ServerGameManager.instance = this;
			console.log(`Server Game Manager created.`);
		} else {
			throw `There are more than one ServerGameManager components in scene`;
		}
		this.net = Engine.instance.getSystem(ServerNetworking);
		if (this.net == null) {
			throw `Could not find ServerNetworking system`;
		}
	}

	update(): void {}
}
