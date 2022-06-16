/** Data type that holds 2 number values for X and Y */
export class Vector2 {
	x: number = 0;
	y: number = 0;

	constructor(x: number | undefined = 0, y: number | undefined = 0) {
		this.x = x;
		this.y = y;
	}

	add(vec: Vector2): Vector2 {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	multiply(vec: Vector2): Vector2 {
		this.x *= vec.x;
		this.y *= vec.y;
		return this;
	}

	/** Returns new instance of copied vector */
	Copy() {
		return new Vector2(this.x, this.y);
	}

	/** Returns this vector normalized */
	normalize(): Vector2 {
		throw new Error('Vector2.normalize not implemented');
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
