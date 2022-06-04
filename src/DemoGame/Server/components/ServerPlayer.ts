import WebSocket from 'ws';
import { Vector2 } from '../../../Engine/Vector2';
import { NetworkPacket } from '../../../Network/NetworkPacket';
export class ServerPlayer {
	private id: number;
	private ws: WebSocket;

	position: Vector2 = new Vector2();

	constructor(ws: WebSocket, id: number) {
		this.id = id;
		this.ws = ws;
	}
	getWebSocket(): WebSocket {
		return this.ws;
	}
	getID(): number {
		return this.id;
	}
	sendPacket(packet: NetworkPacket) {
		if (this.ws == null) return;
		this.ws.send(JSON.stringify(packet));
	}
}
