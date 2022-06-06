import { System } from '../../Engine/System';
import { PacketBatch } from '../../Network/PacketBatch';
import { Handshake } from '../../Network/packets/Handshake';
import WebSocket from 'ws';
import { NetworkPacket } from '../../Network/NetworkPacket';
import { NetworkUtil } from '../../Network/NetworkUtil';

export class ServerNetworking extends System {
	wss: WebSocket.Server | null = null;
	port: number = 8080;

	init() {}
	start() {}
	update() {}

	startServer(port: number) {
		this.port = port;
		this.wss = new WebSocket.Server({ port: this.port });
		console.log(`Listening on port :${this.port}`);
		this.initSocketEvents(this.wss);
	}

	private initSocketEvents(wss: WebSocket.Server) {
		console.log('WebSocket Server initialized');
		wss.on('connection', (ws, req) => {
			var hs = new Handshake();
			hs.data.networkID = NetworkUtil.generateUniqueNetworkID();
			this.sendPacket(ws, hs);

			ws.onmessage = (msg) => {
				var packetBatch = JSON.parse(msg.data.toString()) as PacketBatch;
				this.events.OnPacketBatch(packetBatch);
			};

			ws.onclose = () => {
				// client disconnected
			};
		});
	}

	sendPacket(ws: WebSocket, packet: NetworkPacket) {
		var batch = new PacketBatch();
		batch.packets.push(packet);
		this.sendPacketBatch(ws, batch);
	}

	sendPacketBatch(ws: WebSocket, batch: PacketBatch) {
		ws.send(JSON.stringify(batch));
	}

	events = { OnPacketBatch: (batch: PacketBatch) => {} };
}
