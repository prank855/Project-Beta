import { System } from '../../Engine/System';
import { NetworkPacket } from '../../Shared/Network/NetworkPacket';
import { TickPacket } from '../../Shared/Network/TickPacket';
import { PacketType } from '../../Shared/Network/PacketType';

export class ClientNetworking extends System {
	ws: WebSocket;
	constructor() {
		super();
		this.ws = new WebSocket('ws://kvm.joshh.moe:8080');
		this.initSocket(this.ws);
	}
	initSocket(ws: WebSocket) {
		console.log('WebSockets initialized');
		ws.onopen = () => {
			console.warn('Connected to Server');
		};
		ws.onmessage = (msg) => {
			var t = JSON.parse(msg.data) as NetworkPacket;

			if (t.type == PacketType.TickPacket) {
				var p = t as TickPacket;
				console.log('TICK PACKET', p.data);
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
