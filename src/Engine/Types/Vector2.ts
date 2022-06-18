/** Data type that holds 2 number values for X and Y */
export class Vector2 {
	x: number = 0;
	y: number = 0;

	constructor(x: number | undefined = 0, y: number | undefined = 0) {
		this.x = x;
		this.y = y;
	}

	/** Adds a vector to this vector */
	add(vec: Vector2): Vector2 {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	/** Returns new instance of copied vector */
	Copy() {
		return new Vector2(this.x, this.y);
	}

	/** Returns a new vector normalized */
	get Normalized(): Vector2 {
		var mag = this.Magnitude;
		if (mag == 0) {
			return new Vector2();
		}
		var normalized = this.Copy();
		normalized.x /= mag;
		normalized.y /= mag;
		return normalized;
	}

	get Magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/** Return string as "(x, y)" to rounded precision OR defaults to 2 decimal places */
	toString(precision: number | undefined = 2): string {
		//Math.round((num + Number.EPSILON) * 100) / 100
		let power = Math.pow(10, precision);
		let x = Math.round((this.x + Number.EPSILON) * power) / power;
		let y = Math.round((this.y + Number.EPSILON) * power) / power;
		return `(${x}, ${y})`;
	}
}
