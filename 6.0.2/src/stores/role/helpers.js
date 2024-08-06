/**
 * Extracts the modal name from a given model string.
 * @param {string} model - The model string from which to extract the name.
 * @returns {string} The extracted modal name.
 */
export const getModalName = (model) =>
  model.substring(model.lastIndexOf('\\') + 1);
