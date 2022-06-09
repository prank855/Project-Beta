export class Logger {
	/** Logs a Warning */
	static warn(text: string) {
		console.log(`[Warn] ${text}`);
	}

	/** Generic log */
	static log(text: string) {
		console.log(`[Log] ${text}`);
	}

	/** Logs an Error */
	static error(text: string) {
		console.log(`[Error] ${text}`);
	}

	/** Logs Info */
	static info(text: string) {
		console.log(`[Info] ${text}`);
	}

	/** Logs for debugging */
	static debug(text: string) {
		console.log(`[Debug] ${text}`);
	}

	/** Outputs directly to console */
	static out(text: string) {
		console.log(`${text}`);
	}
}
