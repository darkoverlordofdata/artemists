module artemis {
  "use strict";

  /**
   * Component type that recycles instances.
   * <p>
   * Expects no <code>final</code> fields.
   */
	export class PooledComponent extends Component {
	  public reset(){}
	}
}