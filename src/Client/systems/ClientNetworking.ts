import { System } from '../../Engine/System';
import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class ClientNetworking extends System {
	ws: WebSocket | null = null;
	private connected: boolean = false;
	constructor() {
		super();
	}

	isConnected(): boolean {
		return this.connected;
	}

	connect(url: string) {
		this.ws = new WebSocket(url);
		this.initSocket(this.ws);
	}

	private initSocket(ws: WebSocket) {
		console.log('WebSockets initialized');
		ws.onopen = () => {
			console.warn('Connected to Server');
			this.connected = true;
			this.onOpen();
		};
		ws.onmessage = (msg) => {
			var incPacket = JSON.parse(msg.data) as NetworkPacket;
			this.onPacket(incPacket);
		};
		ws.onclose = () => {
			console.log('Server Connection Closed');
			this.connected = false;
			this.onClose();
		};
	}
	init() {}
	start() {}
	update() {}

	sendPacket(packet: NetworkPacket) {
		this.ws?.send(JSON.stringify(packet));
	}

	// events
	onOpen(): void {}
	onPacket(packet: NetworkPacket): void {}
	onClose(): void {}
}
