import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class ClientHandshake implements NetworkPacket {
	type = PacketType.ClientHandshake;
	data = {};
}
