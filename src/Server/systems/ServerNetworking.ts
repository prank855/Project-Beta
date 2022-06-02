import { System } from '../../Engine/System';
import WebSocket from 'ws';
import { TickPacket as TickPacket } from '../../Shared/Network/TickPacket';
import { Engine } from '../../Engine/Engine';
import { Time } from '../../Engine/systems/Time';

export class ServerNetworking extends System {
	wss: WebSocket.Server;
	constructor() {
		super();
		this.wss = new WebSocket.Server({ port: 8080 });
		this.initSocket(this.wss);
	}

	initSocket(wss: WebSocket.Server) {
		console.log('WebSockets initialized');
		wss.on('connection', (ws, req) => {
			console.log('Client Connected');
			var packet = new TickPacket();
			packet.data.currentTick = Engine.self.frame;
			ws.send(JSON.stringify(packet));
			ws.onmessage = (msg) => {
				console.log(msg.data.toString());
			};
		});
	}

	init() {}
	start() {}
	update() {}
}
