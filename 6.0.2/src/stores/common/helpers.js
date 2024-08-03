// References for various calculation tabs
export let calculationRefs = {};

/**
 * Set the calculation references.
 * @param {object} refs - The references to set.
 */
export const setCalculationRef = (refs) => (calculationRefs = refs);

export let invoicesTabRefs = {};

/**
 * Set the invoices tab references.
 * @param {object} refs - The references to set.
 */
export const setInvoicesTabRef = (refs) => (invoicesTabRefs = refs);

export let estimatesTabRefs = {};

/**
 * Set the estimates tab references.
 * @param {object} refs - The references to set.
 */
export const setEstimatesTabRef = (refs) => (estimatesTabRefs = refs);

export let recurringTabRefs = {};

/**
 * Set the recurring tab references.
 * @param {object} refs - The references to set.
 */
export const setRecurringTabRef = (refs) => (recurringTabRefs = refs);
