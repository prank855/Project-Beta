export class Vector2 {
	x: number = 0;
	y: number = 0;

	constructor(x?: number, y?: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	add(v: Vector2): Vector2 {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	static Copy(v: Vector2): Vector2 {
		var temp = new Vector2();
		temp.x = v.x;
		temp.y = v.y;
		return temp;
	}

	toString(precision: number): string {
		//Math.round((num + Number.EPSILON) * 100) / 100
		var power = Math.pow(10, precision);
		var x = Math.round((this.x + Number.EPSILON) * power) / power;
		var y = Math.round((this.y + Number.EPSILON) * power) / power;
		return `(${x}, ${y})`;
	}
}
