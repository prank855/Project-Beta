import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { Logger } from '../../../Engine/util/Logger';
import { ServerNetworking } from '../../../Server/systems/ServerNetworking';

export class ServerGameManager extends GameComponent {
	static instance: ServerGameManager | undefined;
	private net: ServerNetworking | undefined;

	override start(): void {
		if (ServerGameManager.instance == null) {
			ServerGameManager.instance = this;
			Logger.log(`Server Game Manager created.`);
		} else {
			throw `There are more than one ServerGameManager components in scene`;
		}
		this.net = Engine.instance.getSystem(ServerNetworking);
		if (this.net == null) {
			throw `Could not find ServerNetworking system`;
		}
	}
}
