/**
 * Utility class to handle the "default" FlashMessage instance for global use.
 */
class FlashMessageManager {
  /** @private {Array} Preserved flash messages to hold temporarily. */
  _preservedFlashMessages = [];

  /** @private {Object|null} Current flash message instance. */
  _currentFlashMessage = null;

  /** @private {boolean} Indicates if flash messages are enabled. */
  _enabled = true;

  /**
   * Checks if flash messages are enabled.
   * @returns {boolean} True if enabled, false otherwise.
   */
  get isEnabled() {
    return !!this._enabled;
  }

  /**
   * Disables or enables flash messages.
   * @param {boolean} [disable=true] - If true, disables flash messages.
   */
  setDisabled(disable = true) {
    this._enabled = !disable;
  }

  /**
   * Holds the current flash message instance temporarily.
   * @param {Object} _tempInstance - The flash message instance to hold.
   */
  hold(_tempInstance) {
    if ('_id' in _tempInstance) {
      let wasHolded = false;
      if (this._preservedFlashMessages.length > 0) {
        wasHolded =
          this._preservedFlashMessages[this._preservedFlashMessages.length - 1]
            ._id === _tempInstance._id;
      }

      if (!wasHolded) {
        this._preservedFlashMessages.push(this._currentFlashMessage);
        this._currentFlashMessage = null;

        this.register(_tempInstance);
      }
    }
  }

  /**
   * Unholds the last held flash message instance.
   */
  unhold() {
    if (this._preservedFlashMessages.length > 0) {
      // Hide the current flash message if it exists
      if (!!this._currentFlashMessage) {
        this._currentFlashMessage.hideMessage();
        this._currentFlashMessage = null;
      }

      this.register(this._preservedFlashMessages.pop());
    }
  }

  /**
   * Registers a new flash message instance as the current one.
   * @param {Object} _instance - The flash message instance to register.
   */
  register(_instance) {
    if (!this._currentFlashMessage && '_id' in _instance) {
      this._currentFlashMessage = _instance;
    }
  }

  /**
   * Unregisters a flash message instance.
   * @param {Object} _instance - The flash message instance to unregister.
   */
  unregister(_instance) {
    if (
      !!this._currentFlashMessage &&
      this._currentFlashMessage._id === _instance._id
    ) {
      this._currentFlashMessage = null;
    }
  }

  /**
   * Gets the current flash message instance.
   * @returns {Object|null} The current flash message instance or null.
   */
  getCurrent() {
    return this._currentFlashMessage;
  }
}

// Export a singleton instance of FlashMessageManager
export default new FlashMessageManager();
