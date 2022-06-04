import { NetworkPacket } from './NetworkPacket';
import { PacketType } from './PacketType';

export class TickPacket implements NetworkPacket {
	type = PacketType.TickPacket;
	data = { currentTick: 0, currentTime: 0 };
}
