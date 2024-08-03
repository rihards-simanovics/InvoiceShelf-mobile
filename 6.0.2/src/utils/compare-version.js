/**
 * Compares two version strings.
 *
 * @param {string} v1 - The first version string to compare.
 * @param {string} v2 - The second version string to compare.
 * @param {Object} [options] - Options for comparison.
 * @param {boolean} [options.lexicographical=false] - If true, compares version parts lexicographically.
 * @param {boolean} [options.zeroExtend=false] - If true, extends the shorter version with zeros.
 * @returns {number} - Returns:
 *   - 1 if v1 is greater than v2,
 *   - -1 if v1 is less than v2,
 *   - 0 if they are equal,
 *   - NaN if either version string is invalid.
 */
export default function (v1, v2, options) {
  const lexicographical = options && options.lexicographical;
  const zeroExtend = options && options.zeroExtend;
  let v1parts = v1.split('.');
  let v2parts = v2.split('.');

  /**
   * Validates a version part based on the comparison options.
   *
   * @param {string} x - The version part to validate.
   * @returns {boolean} - Returns true if the part is valid, otherwise false.
   */
  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN; // Return NaN if either version string is invalid
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push('0');
    while (v2parts.length < v1parts.length) v2parts.push('0');
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1; // v1 has more parts, so it's greater
    }

    if (v1parts[i] == v2parts[i]) {
      continue; // Parts are equal, continue to the next part
    } else if (v1parts[i] > v2parts[i]) {
      return 1; // v1 is greater
    } else {
      return -1; // v2 is greater
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1; // v2 has more parts, so it's greater
  }

  return 0; // Versions are equal
}
