import { ClientNetworking } from '../../../Engine/Client/Systems/ClientNetworking';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Logger } from '../../../Engine/Util/Logger';
import { WorldHandler } from './WorldHandler';

export class ClientGameManager extends GameComponent {
	static instance: ClientGameManager;
	private net: ClientNetworking | undefined;

	private serverURL: string = `ws://kvm.joshh.moe:8080`;

	override serializedVars: string[] = [this.serverURL];

	constructor(parent: GameObject) {
		super(parent);
		if (ClientGameManager.instance == null) {
			ClientGameManager.instance = this;
			Logger.log(`Game Manager created.`);
		} else {
			//throw `There are more than one ClientGameManager components in scene.`;
		}
	}

	override init(): void {
		this.net = Engine.instance.getSystem(ClientNetworking);

		this.net.connect(this.serverURL);

		this.net.events.OnPacketBatch = (batch) => {
			// handle packets
		};
	}

	override start(): void {
		this.SetupWorld();
		console.warn('Serialized Scene', Engine.instance.CurrentScene.serialize());
	}

	worldHandler: WorldHandler | undefined;
	SetupWorld() {
		this.worldHandler = this.parent.addComponent(WorldHandler);
		this.worldHandler.CreateWorld();
	}
}
