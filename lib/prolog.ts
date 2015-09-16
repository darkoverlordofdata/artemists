/**
 *
 *      ___       __            _   ______
 *     / _ | ____/ /____ __ _  (_)_/_  __/__
 *    / __ |/ __/ __/ -_)  ' \/ (_-</ / (_-<
 *   /_/ |_/_/  \__/\__/_/_/_/_/___/_/ /___/
 *
 *
 */

/**
 * artemis namespace
 * @const
 */
module artemis {

  /**
   * For documenting where Function refers to a class definition
   */
  export interface Class extends Function {}

  /**
   * Gets Class Metadata - Name
   *
   * @param {Function} klass
   * @return {string}
   */
  export function getClassName(klass) {
    return klass.className || klass.name;
  }

}