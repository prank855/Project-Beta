export class Logger {
	static warn(text: string) {
		console.log(`[Warn] ${text}`);
	}
	static log(text: string) {
		console.log(`[Log] ${text}`);
	}
	static error(text: string) {
		console.log(`[Error] ${text}`);
	}
	static debug(text: string) {
		console.log(`[Debug] ${text}`);
	}
	static out(text: string) {
		console.log(`${text}`);
	}
}
