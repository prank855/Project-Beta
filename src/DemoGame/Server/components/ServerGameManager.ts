import { Engine } from '../../../Engine/Engine';
import { GameComponent } from '../../../Engine/GameComponent';
import { NetworkPacket } from '../../../Network/NetworkPacket';
import { PacketType } from '../../../Network/PacketType';
import { ServerNetworking } from '../../../Server/systems/ServerNetworking';
import WebSocket from 'ws';
import { ServerPlayer } from './ServerPlayer';
import { AssignID as AssignIDPacket } from '../../packets/AssignID';
import { NetworkUtil } from '../../../Server/NetworkUtil';
import { CreatePlayer } from '../../packets/CreatePlayer';
import { WorldState } from '../../packets/WorldState';
import { Vector2 } from '../../../Engine/Vector2';
import { RemovePlayer } from '../../packets/RemovePlayer';
import { ClientState } from '../../packets/ClientState';
import { Time } from '../../../Engine/systems/Time';

export class ServerGameManager extends GameComponent {
	static instance: ServerGameManager | null = null;
	private net: ServerNetworking | null = null;

	players: ServerPlayer[] = [];

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
		this.net.onPacket = this.onPacket;
		this.net.onDisconnect = this.onDisconnect;
	}

	update(): void {
		// send world state
		this.addGlobalPacket(this.createWorldState());
		this.sendGlobalPacketQueue();
	}

	createWorldState(): WorldState {
		var worldState = new WorldState();
		worldState.data.tick = Engine.instance.frame;
		worldState.data.tickRate = Engine.instance.framerate;
		worldState.data.time = Time.elapsedTime;
		let playerList: { id: number; position: Vector2 }[] = [];
		for (var player of this.players) {
			var p = { id: player.getID(), position: player.position };
			playerList.push(p);
		}
		worldState.data.players = playerList;
		return worldState;
	}

	onDisconnect(ws: WebSocket) {
		var self = ServerGameManager.instance;
		if (self == null) return;
		for (var player of self.players) {
			if (player.getWebSocket() == ws) {
				var removePlayerPacket = new RemovePlayer();
				removePlayerPacket.data.id = player.getID();
				self.addGlobalPacket(removePlayerPacket);
				self.players.splice(self.players.indexOf(player), 1);
			}
		}
	}

	onPacket(ws: WebSocket, packet: NetworkPacket): void {
		var self = ServerGameManager.instance;
		if (self == null) return;
		switch (packet.type) {
			case PacketType.ClientHandshake:
				console.log('Received Client Handshake');

				let player = new ServerPlayer(
					ws,
					NetworkUtil.generateUniqueNetworkID()
				);
				player.position = new Vector2(Math.random() * 20, Math.random() * 20);
				self.players.push(player);
				console.log(self.players.length);

				var assignIDPacket = new AssignIDPacket();
				assignIDPacket.data.id = player.getID();
				player.sendPacket(assignIDPacket);

				var createPlayerPacket = new CreatePlayer();
				createPlayerPacket.data.id = player.getID();
				createPlayerPacket.data.position = player.position;
				self.addGlobalPacket(createPlayerPacket);
				break;
			case PacketType.ClientState:
				for (var p of self.players) {
					if (ws == p.getWebSocket()) {
						var clientState = packet as ClientState;
						p.position = clientState.data.position;
					}
				}
				break;
		}
	}

	private globalSendQueue: NetworkPacket[] = [];

	addGlobalPacket(packet: NetworkPacket) {
		this.globalSendQueue.push(packet);
	}
	private sendGlobalPacketQueue() {
		// send each global packet to each player
		for (var player of this.players) {
			for (var packet of this.globalSendQueue) {
				player.sendPacket(packet);
			}
		}
		// empty queue
		this.globalSendQueue = [];
	}
}
