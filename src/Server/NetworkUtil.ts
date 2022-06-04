export class NetworkUtil {
	private static netIDS: number[] = [];
	static generateUniqueNetworkID(): number {
		let num = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		if (this.netIDS.indexOf(num) == null) {
			this.generateUniqueNetworkID();
		}
		this.netIDS.push(num);
		return num;
	}
}
