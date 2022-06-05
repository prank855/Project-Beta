import { Vector2 } from '../../Engine/Vector2';
import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class WorldState implements NetworkPacket {
	type = PacketType.WorldState;
	data: {
		tick: number;
		tickRate: number;
		time: number;
		players: { id: number; position: Vector2 }[];
	} = {
		tick: 0,
		tickRate: 0,
		time: 0,
		players: [],
	};
}
