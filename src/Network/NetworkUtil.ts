import { NetworkID } from './NetworkID';

export class NetworkUtil {
	private static netIDS: number[] = [];
	static generateUniqueNetworkID(): NetworkID {
		let num = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		if (this.netIDS.indexOf(num) == null) {
			this.generateUniqueNetworkID();
		}
		this.netIDS.push(num);
		return num;
	}
}
