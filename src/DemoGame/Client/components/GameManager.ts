import { SpriteRenderer } from '../../../Client/components/SpriteRenderer';
import { ClientNetworking } from '../../../Client/systems/ClientNetworking';
import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { GameObject } from '../../../Engine/GameObject';
import { Time } from '../../../Engine/systems/Time';
import { Vector2 } from '../../../Engine/Vector2';
import { NetworkPacket } from '../../../Network/NetworkPacket';
import { PacketType } from '../../../Network/PacketType';
import { AssignID } from '../../packets/AssignID';
import { ClientHandshake } from '../../packets/ClientHandshake';
import { ClientState } from '../../packets/ClientState';
import { CreatePlayer } from '../../packets/CreatePlayer';
import { RemovePlayer } from '../../packets/RemovePlayer';
import { WorldState } from '../../packets/WorldState';
import { Player } from './Player';
import { SimpleMovement } from './SimpleMovement';

export class ClientGameManager extends GameComponent {
	static instance: ClientGameManager;

	private net: ClientNetworking | null = null;

	private player: Player | null = null;

	players: Player[] = [];

	getPlayer(): Player | null {
		return this.player;
	}

	setPlayer(playerGO: Player) {
		this.player = playerGO;
	}

	private networkID: number = -1;

	disconnected: boolean = false;

	constructor() {
		super();
		if (ClientGameManager.instance == null) {
			ClientGameManager.instance = this;
			console.log(`Game Manager created.`);
		} else {
			throw `There are more than one ClientGameManager components in scene.`;
		}

		this.initPackets();
	}

	init(): void {
		this.net = Engine.instance.getSystem(ClientNetworking);
		if (this.net == null) {
			throw `Could not find ClientNetworking system`;
		}
		this.net.connect(`ws://kvm.joshh.moe:8080`);
		this.net.onOpen = () => {
			console.log('Sent Client Handshake');
			this.net?.sendPacket(new ClientHandshake());
		};
		this.net.onPacket = this.onPacket;
		this.net.onClose = () => {
			if (ClientGameManager.instance)
				ClientGameManager.instance.disconnected = true;
		};
	}

	start(): void {}

	serverTickRate: number | null = null;
	serverTick: number | null = null;
	serverTime: number = 0;

	lastTick: number | null = null;
	update(): void {
		if (this.serverTickRate && this.serverTick) {
			if (this.lastTick == null) {
				this.Tick();
				this.lastTick = Time.elapsedTime;
			} else {
				while (Time.elapsedTime - this.lastTick >= 1 / this.serverTickRate) {
					this.Tick();
					this.lastTick += 1 / this.serverTickRate;
				}
			}
		}
	}

	Tick(): void {
		// send client state
		if (this.disconnected) return;
		this.net?.sendPacket(this.createClientState());
	}

	createClientState(): ClientState {
		var clientState = new ClientState();
		if (this.player?.parent)
			clientState.data.position = this.player.parent.transform.position;
		return clientState;
	}

	private packetDictionary: Map<PacketType, (packet: NetworkPacket) => void> =
		new Map<PacketType, (packet: NetworkPacket) => void>();

	private initPackets() {
		var self = ClientGameManager.instance;
		if (self == null) return;

		this.packetDictionary.set(PacketType.AssignID, (packet) => {
			var assignIDPacket = packet as AssignID;
			self.networkID = assignIDPacket.data.id;
			console.log(`Set Network ID to ${self.networkID}`);
		});
		this.packetDictionary.set(PacketType.CreatePlayer, (packet) => {
			var createPlayerPacket = packet as CreatePlayer;
			self.CreatePlayer(
				createPlayerPacket.data.id,
				createPlayerPacket.data.position
			);
		});
		this.packetDictionary.set(PacketType.RemovePlayer, (packet) => {
			var removePlayerPacket = packet as RemovePlayer;
			console.log(`Remove player ID: ${removePlayerPacket.data.id}`);
			for (var player of self.players) {
				if (player.networkID == removePlayerPacket.data.id) {
					// delete go
					if (player.parent)
						Engine.instance.getScene().removeGameObject(player.parent.id);
				}
			}
		});
		this.packetDictionary.set(PacketType.WorldState, (packet) => {
			var worldState = packet as WorldState;
			self.serverTickRate = worldState.data.tickRate;
			self.serverTick = worldState.data.tick;
			self.serverTime = worldState.data.time;

			var knownIDs: number[] = [];

			for (var p of worldState.data.players) {
				knownIDs.push(p.id);
			}

			// update position of existing players
			for (let player of self.players) {
				for (var packetPlayer of worldState.data.players) {
					if (player.networkID == packetPlayer.id) {
						knownIDs.splice(knownIDs.indexOf(player.networkID, 1));
						if (player.parent)
							player.parent.transform.position = packetPlayer.position;
					}
				}
			}
			knownIDs.splice(knownIDs.indexOf(self.networkID, 1));

			// add players that do not exist yet
			for (var p of worldState.data.players) {
				if (knownIDs.includes(p.id)) {
					self.CreatePlayer(p.id, p.position);
					console.log('create unknown player');
				}
			}
		});
	}

	onPacket(packet: NetworkPacket) {
		ClientGameManager.instance.packetDictionary.get(packet.type)?.(packet);
	}

	CreatePlayer(id: number, position: Vector2) {
		if (id == this.networkID) {
			// self
			{
				var go = new GameObject();
				go.name = 'Player';

				let sr = go.addComponent(SpriteRenderer);
				go.addComponent(Player);
				go.addComponent(SimpleMovement);

				go.transform.position = position;

				sr.setSprite('Trollface');
				sr.sprite.pixelPerUnit = 32;
				ClientGameManager.instance?.setPlayer(go.getComponent(Player));
				Engine.instance.getScene().addGameObject(go);
			}
		} else {
			// other player
			{
				console.log(`other`);
				var go = new GameObject();
				go.name = 'Player';

				let sr = go.addComponent(SpriteRenderer);
				let player = go.addComponent(Player);
				player.networkID = id;
				go.transform.position = position;

				sr.setSprite('Trollface');
				sr.sprite.pixelPerUnit = 32;
				ClientGameManager.instance?.players.push(player);
				Engine.instance.getScene().addGameObject(go);
			}
		}
	}
}
