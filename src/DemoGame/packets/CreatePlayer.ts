import { Vector2 } from '../../Engine/Vector2';
import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class CreatePlayer implements NetworkPacket {
	type = PacketType.CreatePlayer;
	data = { id: 0, position: new Vector2() };
}
