import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class RemovePlayer implements NetworkPacket {
	type = PacketType.RemovePlayer;
	data = { id: 0 };
}
