import { System } from '../../Engine/System';
import { NetworkID } from '../../Network/NetworkID';
import { PacketBatch } from '../../Network/PacketBatch';
import { Handshake } from '../../Network/packets/Handshake';
import { PacketType } from '../../Network/PacketType';

export class ClientNetworking extends System {
	ws: WebSocket | null = null;
	url: string = 'no server url';
	connected: boolean = false;
	networkID: NetworkID | undefined;

	init() {}
	start() {}
	update() {}

	connect(url: string) {
		this.url = url;
		this.ws = new WebSocket(url);
		this.initSocketEvents(this.ws);
	}

	private initSocketEvents(ws: WebSocket) {
		ws.onopen = () => {
			console.log(`Connecting to "${this.url}"`);
		};

		ws.onmessage = (msg) => {
			var packetBatch = JSON.parse(msg.data) as PacketBatch;
			if (!this.connected) {
				for (var packet of packetBatch.packets) {
					if (packet.type == PacketType.Handshake) {
						this.connected = true;
						var handshakePacket = packet as Handshake;
						this.networkID = handshakePacket.data.networkID;
						console.warn(
							`Successful Server Connection`,
							`Network ID set to ${this.networkID}`
						);
						return;
					}
				}
			}
			this.events.OnPacketBatch(packetBatch);
		};

		ws.onclose = () => {};
	}

	events = {
		OnPacketBatch: (batch: PacketBatch) => {},
		OnDisconnect: () => {},
	};
}
