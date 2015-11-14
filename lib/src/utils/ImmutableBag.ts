module artemis.utils {
  "use strict";

	export interface ImmutableBag<E> {

		get(index: number): E;

		size(): number;

		isEmpty(): boolean;

		contains(e: E): boolean;

	}
}