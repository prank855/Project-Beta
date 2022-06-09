import { Logger } from '../../Util/Logger';
import { System } from '../../System';
import { NetworkID } from '../../Network/types/NetworkID';
import { PacketBatch } from '../../Network/PacketBatch';
import { Handshake } from '../../Network/Packets/Handshake';
import { PacketType } from '../../Network/PacketType';

/**Handles connections to ServerNetworking */
export class ClientNetworking extends System {
	ws: WebSocket | undefined;
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
			Logger.log(`Connected to "${this.url}"`);
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
		var self = this;
		ws.onclose = () => {
			// retry connection in 3 secs
			console.warn('Disconnected from server, trying again in 3 seconds');
			this.reconnect(3);
		};

		ws.onerror = () => {
			console.warn('Could not access server, trying again in 3 seconds');
			this.reconnect(3);
		};
	}

	reconnect(seconds: number) {
		this.connected = false;
		this.networkID = undefined;
		setTimeout(() => {
			this.connect(this.url);
		}, seconds * 1000);
	}

	events = {
		OnPacketBatch: (batch: PacketBatch) => {},
		OnDisconnect: () => {},
	};
}
