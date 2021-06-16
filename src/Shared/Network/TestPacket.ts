import { NetworkPacket } from './NetworkPacket';

export class TestPacket implements NetworkPacket {
	type = 'TestPacket';
	tick: number = 0;
}
