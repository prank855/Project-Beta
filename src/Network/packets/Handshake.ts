import { NetworkPacket } from '../NetworkPacket';
import { PacketType } from '../PacketType';

export class Handshake implements NetworkPacket {
	type = PacketType.Handshake;
	data = { text: 'Hello' };
}
