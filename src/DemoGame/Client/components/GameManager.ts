import { ClientNetworking } from '../../../Client/systems/ClientNetworking';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';

export class ClientGameManager extends GameComponent {
	static instance: ClientGameManager;
	private net: ClientNetworking | null = null;

	private serverURL: string = `ws://kvm.joshh.moe:8080`;

	constructor() {
		super();
		if (ClientGameManager.instance == null) {
			ClientGameManager.instance = this;
			console.log(`Game Manager created.`);
		} else {
			throw `There are more than one ClientGameManager components in scene.`;
		}
	}

	init(): void {
		this.net = Engine.instance.getSystem(ClientNetworking);

		this.net.connect(this.serverURL);

		this.net.events.OnPacketBatch = (batch) => {
			// handle packets
		};
	}

	start(): void {}

	update(): void {}
}
