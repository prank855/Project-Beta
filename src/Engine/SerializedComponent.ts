export class SerializedComponent {
	id: number | undefined;
	name: string | undefined;
	parentID: number | undefined;
	enabled: boolean | undefined;
	vars: Map<string, any> | undefined;
}
