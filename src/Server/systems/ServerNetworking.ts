import { System } from '../../Engine/System';
import WebSocket from 'ws';
import { TickPacket as TickPacket } from '../../Shared/Network/TickPacket';
import { Engine } from '../../Engine/Engine';
import { Time } from '../../Engine/systems/Time';
import { PacketType } from '../../Shared/Network/PacketType';

export class ServerNetworking extends System {
	wss: WebSocket.Server;

	clients: WebSocket[] = [];
	constructor() {
		super();
		this.wss = new WebSocket.Server({ port: 8080 });
		this.initSocket(this.wss);
	}

	initSocket(wss: WebSocket.Server) {
		console.log('WebSockets initialized');
		wss.on('connection', (ws, req) => {
			this.clients.push(ws);
			console.log(
				`Client Connected: ${req.socket.remoteAddress?.substring(
					7,
					7 + 6
				)}.XXX.XX}`
			);

			ws.onmessage = (msg) => {
				console.log(msg.data.toString());
			};

			ws.onclose = () => {
				console.log('Client Disconnected');
				this.clients.splice(this.clients.indexOf(ws), 1);
			};
		});
	}

	sendPacket(ws: WebSocket, packetType: PacketType) {
		switch (packetType) {
			case PacketType.TickPacket:
				var packet = new TickPacket();

				packet.data.currentTick = Engine.self.frame;
				packet.data.currentTime = Time.elapsedTime;

				ws.send(JSON.stringify(packet));
				break;
		}
	}

	init() {}
	start() {}
	update() {
		for (var ws of this.clients) {
			this.sendPacket(ws, PacketType.TickPacket);
		}
	}
}
