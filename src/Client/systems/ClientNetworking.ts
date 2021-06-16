import { System } from '../../Engine/System';
import { NetworkPacket } from '../../Shared/Network/NetworkPacket';
import { TestPacket } from '../../Shared/Network/TestPacket';

export class ClientNetworking extends System {
	ws: WebSocket;
	constructor() {
		super();
		this.ws = new WebSocket('ws://localhost:8080');
		this.initSocket(this.ws);
	}
	initSocket(ws: WebSocket) {
		console.log('WebSockets initialized');
		ws.onopen = () => {
			console.warn('Connected to Server');
		};
		ws.onmessage = (msg) => {
			var t = JSON.parse(msg.data) as NetworkPacket;

			if (t.type == 'TestPacket') {
				var p = t as TestPacket;
				console.log('TEST PACKET, TICK:' + p.tick);
			}
		};
		ws.onclose = () => {
			console.log('Server Connection Closed');
		};
	}
	init() {}
	start() {}
	update() {}
}
