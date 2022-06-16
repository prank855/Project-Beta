export class DebugUtil {
	/** Stalls program for X amount of seconds */
	static BusyWait(secondsToWait: number) {
		let start = new Date().getTime();
		let end = start;
		while (end < start + secondsToWait * 1000) {
			end = new Date().getTime();
		}
	}
}
