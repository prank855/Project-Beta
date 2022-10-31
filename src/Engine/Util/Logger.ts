export class Logger {
	/** Sets if Logger is enabled */
	public static enabled = false;

	/** Logs a Warning */
	static warn(text: string) {
		if (this.enabled) console.log(`[Warn] ${text}`);
	}

	/** Generic log */
	static log(text: string) {
		if (this.enabled) console.log(`[Log] ${text}`);
	}

	/** Logs an Error */
	static error(text: string) {
		if (this.enabled) console.log(`[Error] ${text}`);
	}

	/** Logs Info */
	static info(text: string) {
		if (this.enabled) console.log(`[Info] ${text}`);
	}

	/** Logs for debugging */
	static debug(text: string) {
		if (this.enabled) console.log(`[Debug] ${text}`);
	}

	/** Outputs directly to console */
	static print(text: string) {
		if (this.enabled) console.log(`${text}`);
	}
}
