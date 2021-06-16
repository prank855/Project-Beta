import { System } from '../../Engine/System';
import WebSocket from 'ws';
import { TestPacket } from '../../Shared/Network/TestPacket';
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
			var data = new TestPacket();
			data.tick = Engine.self.frame;
			ws.send(JSON.stringify(data));
			ws.onmessage = (msg) => {
				console.log(msg.data.toString());
			};
		});
	}

	init() {}
	start() {}
	update() {}
}
