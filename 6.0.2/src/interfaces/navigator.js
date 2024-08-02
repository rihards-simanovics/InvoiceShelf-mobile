/**
 * Type definition for navigation functions that a view can call.
 */
export type INavigation = {
  /**
   * Navigate forward to a new route.
   * @param {Route} route - The route to navigate to.
   */
  push: (route: Route) => void,

  /**
   * Go back one page.
   */
  pop: () => void,

  /**
   * Go back N pages at once. When N=1, behavior matches pop().
   * @param {number} n - The number of pages to go back.
   */
  popN: (n: number) => void,

  /**
   * Replace the route for the current page and immediately load the view for the new route.
   * @param {Route} route - The new route to replace the current one.
   */
  replace: (route: Route) => void,

  /**
   * Replace the route/view for the previous page.
   * @param {Route} route - The new route to replace the previous one.
   */
  replacePrevious: (route: Route) => void,

  /**
   * Replace the previous route/view and transition back to it.
   * @param {Route} route - The new route to replace the previous one.
   */
  replacePreviousAndPop: (route: Route) => void,

  /**
   * Replace the top item and pop to the top.
   * @param {Route} route - The new route to reset to.
   */
  resetTo: (route: Route) => void,

  /**
   * Go back to the item for a particular route object.
   * @param {Route} route - The route to go back to.
   */
  popToRoute: (route: Route) => void,

  /**
   * Go back to the top item.
   */
  popToTop: () => void,

  /**
   * Dispatch an action or an update function to the router.
   * The update function will receive the current state.
   * @param {Function} action - Action object or update function.
   */
  dispatch: (action: (state: State) => NavigationAction) => void,

  /**
   * Navigate to a route in the current navigation tree.
   * @param {string} route - Name of the route to navigate to.
   * @param {object} [params] - Params object for the route.
   */
  navigate: (route: string, params?: object) => void,

  /**
   * Go back to the previous route in history.
   * @param {string} [name] - Name of the route to go back to.
   */
  goBack: (name?: string) => void,

  /**
   * Check if dispatching back action will be handled by navigation.
   * Note that this method doesn't re-render the screen when the result changes. So don't use it in `render`.
   * @returns {boolean} - Whether the back action can be handled.
   */
  canGoBack: () => boolean,

  /**
   * Add a listener to the current navigation.
   * @param {string} [name] - Name of the event to listen for.
   * @param {Function} fun - The function to call when the event occurs.
   */
  addListener: (name?: string, fun: Function) => void,
};
