import { Vector2 } from '../../Engine/Vector2';
import { NetworkPacket } from '../../Network/NetworkPacket';
import { PacketType } from '../../Network/PacketType';

export class ClientState implements NetworkPacket {
	type = PacketType.ClientState;
	data: { position: Vector2 } = { position: new Vector2() };
}
