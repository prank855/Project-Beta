import { SerializedComponent } from './SerializedComponent';
import { Transform } from './types/Transform';

export class SerializedGameObject {
	id: number | undefined;
	name: string | undefined;
	transform: Transform | undefined;
	parent: number | undefined;
	components: SerializedComponent[] | undefined;
	children: SerializedGameObject[] | undefined;
}
