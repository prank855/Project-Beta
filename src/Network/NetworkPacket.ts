import { PacketType } from './PacketType';

export interface NetworkPacket {
	type: PacketType;
	data: object;
}
