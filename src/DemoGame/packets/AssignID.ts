import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class AssignID implements NetworkPacket {
	type = PacketType.AssignID;
	data = { id: 0 };
}
