/**
 *
 *      ___       __            _   ______
 *     / _ | ____/ /____ __ _  (_)_/_  __/__
 *    / __ |/ __/ __/ -_)  ' \/ (_-</ / (_-<
 *   /_/ |_/_/  \__/\__/_/_/_/_/___/_/ /___/
 *
 *
 */
module artemis {

  /**
   * For documenting where Function refers to a class definition
   */
  export interface Class extends Function {}

  /**
   * Gets Class Metadata - Name
   *
   * @param klass
   * @returns {string|SVGAnimatedString|string|string|string|string|*}
   */
  export function getClassName(klass) {
    return klass.className || klass.name;
  }

}