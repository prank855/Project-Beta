import { NetworkID } from '../types/NetworkID';
import { NetworkPacket } from '../NetworkPacket';
import { PacketType } from '../PacketType';

export class Handshake implements NetworkPacket {
	type = PacketType.Handshake;
	data: { networkID: NetworkID } = { networkID: 0 };
}
