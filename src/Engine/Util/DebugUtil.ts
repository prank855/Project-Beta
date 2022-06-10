export class DebugUtil {
	/** Stalls program for X amount of seconds */
	static BusyWait(secondsToWait: number) {
		var start = new Date().getTime();
		var end = start;
		while (end < start + secondsToWait * 1000) {
			end = new Date().getTime();
		}
	}
}
