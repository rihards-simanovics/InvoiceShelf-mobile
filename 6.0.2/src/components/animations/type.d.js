/**
 * Interface for the properties accepted by the FadeListAnimation and FadeAnimation components.
 */
export interface IProps {
  /**
   * Delay of fade in animation in ms.
   * @default 0
   */
  delay?: number;

  /**
   * Duration of the fade in animation in ms.
   * @default 200
   */
  duration?: number;
}

/**
 * Interface for the state of the FadeListAnimation and FadeAnimation components.
 */
export interface IStates {
  /**
   * Animate the touchable list to a new opacity.
   * @default 0
   */
  opacity: any;
}
