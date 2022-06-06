import { ClientNetworking } from '../../../Client/systems/ClientNetworking';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { WorldHandler } from './WorldHandler';

export class ClientGameManager extends GameComponent {
	static instance: ClientGameManager;
	private net: ClientNetworking | null = null;

	private serverURL: string = `ws://kvm.joshh.moe:8080`;

	constructor(parent: GameObject) {
		super(parent);
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

	start(): void {
		this.SetupWorld();
	}

	worldHandler: WorldHandler | undefined;
	SetupWorld() {
		this.worldHandler = this.parent.addComponent(WorldHandler);
		this.worldHandler.CreateWorld();
	}

	update(): void {}
}
