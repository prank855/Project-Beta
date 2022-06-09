import { System } from '../../Engine/System';
import { PacketBatch } from '../../Network/PacketBatch';
import { Handshake } from '../../Network/packets/Handshake';
import WebSocket from 'ws';
import { NetworkPacket } from '../../Network/NetworkPacket';
import { NetworkUtil } from '../../Network/NetworkUtil';
import { Logger } from '../../Engine/util/Logger';

/** Handles incoming networked clients  */
export class ServerNetworking extends System {
	wss: WebSocket.Server | undefined;
	port: number = 8080;

	init() {}
	start() {}
	update() {}

	startServer(port: number) {
		this.port = port;
		this.wss = new WebSocket.Server({ port: this.port });
		Logger.log(`Listening on port :${this.port}`);
		this.initSocketEvents(this.wss);
	}

	private initSocketEvents(wss: WebSocket.Server) {
		Logger.log('WebSocket Server initialized');
		wss.on('connection', (ws, req) => {
			Logger.log(
				`Client Connected: ${this.getObfuscatedIPAdress(
					req
				)} [${new Date().toLocaleString('en-US')}]`
			);
			var hs = new Handshake();
			hs.data.networkID = NetworkUtil.generateUniqueNetworkID();
			this.sendPacket(ws, hs);

			ws.onmessage = (msg) => {
				var packetBatch = JSON.parse(msg.data.toString()) as PacketBatch;
				this.events.OnPacketBatch(packetBatch);
			};

			ws.onclose = () => {
				// client disconnected
				Logger.log(`Client Disconnected: ${this.getObfuscatedIPAdress(req)}`);
			};
		});
	}

	getObfuscatedIPAdress(req: any): string {
		return `${req.socket.remoteAddress?.substring(
			7, // remove weird initial format
			7 + 6 // removes last 6 number of ip
		)}.XXX.XX`;
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
