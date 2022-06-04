import { System } from '../../Engine/System';
import WebSocket from 'ws';
import { NetworkPacket } from '../../Network/NetworkPacket';

export class ServerNetworking extends System {
	wss: WebSocket.Server | null = null;

	clients: WebSocket[] = [];
	constructor() {
		super();
	}

	startServer(port: number) {
		this.wss = new WebSocket.Server({ port: port });
		this.initSocket(this.wss);
	}

	private initSocket(wss: WebSocket.Server) {
		console.log('WebSockets Server initialized');
		wss.on('connection', (ws, req) => {
			this.onConnection(ws);
			this.clients.push(ws);
			console.log(
				`Client Connected: ${req.socket.remoteAddress?.substring(
					7,
					7 + 6
				)}.XXX.XX`
			);

			ws.onmessage = (msg) => {
				var incPacket = JSON.parse(msg.data.toString()) as NetworkPacket;
				this.onPacket(ws, incPacket);
			};

			ws.onclose = () => {
				this.onDisconnect(ws);
				console.log('Client Disconnected');
				this.clients.splice(this.clients.indexOf(ws), 1);
			};
		});
	}

	init() {}
	start() {}
	update() {}

	sendPacket(client: WebSocket, packet: NetworkPacket): void {
		client.send(JSON.stringify(packet));
	}

	// events
	onConnection(ws: WebSocket): void {}
	onPacket(ws: WebSocket, packet: NetworkPacket): void {}
	onDisconnect(ws: WebSocket): void {}
}
