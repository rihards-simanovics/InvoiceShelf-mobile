import {hasValue, isEmpty} from '@/constants';
import {calculationRefs} from 'stores/common/helpers';

/**
 * Calculates the total amount of selected items.
 * @returns {number} The total amount of selected items.
 */
function total() {
  let selectedItems = calculationRefs?.props?.selectedItems;
  let subTotal = 0;

  if (isEmpty(selectedItems)) {
    return subTotal;
  }

  selectedItems.map((val) => (subTotal += JSON.parse(val?.total ?? 0)));

  return JSON.parse(subTotal);
}

/**
 * Calculates the total tax based on the selected tax items.
 * @returns {number} The total tax amount.
 */
function tax() {
  const {
    formValues: {taxes},
  } = calculationRefs?.props;

  let totalTax = 0;

  if (isEmpty(taxes)) {
    return totalTax;
  }

  taxes.map((val) => {
    if (!val.compound_tax) {
      totalTax += getTaxValue(val?.percent ?? 0);
    }
  });

  return totalTax;
}

/**
 * Calculates the compound tax value based on the given tax percentage.
 * @param {number} tax - The tax percentage.
 * @returns {number} The compound tax value.
 */
function getCompoundTaxValue(tax = 0) {
  return (tax * JSON.parse(totalAmount() ?? 0)) / 100;
}

/**
 * Calculates the total compound tax based on the selected tax items.
 * @returns {number} The total compound tax amount.
 */
function CompoundTax() {
  const {
    formValues: {taxes},
  } = calculationRefs?.props;

  let totalTax = 0;

  if (isEmpty(taxes)) {
    return totalTax;
  }

  taxes.map((val) => {
    if (val?.compound_tax) {
      totalTax += getCompoundTaxValue(val?.percent ?? 0);
    }
  });

  return totalTax;
}

/**
 * Calculates the total discount based on the discount type and amount.
 * @returns {number} The total discount amount.
 */
function totalDiscount() {
  const {
    formValues: {discount = 0, discount_type = null},
  } = calculationRefs?.props;

  let discountPrice = 0;

  if (discount_type === 'percentage') {
    discountPrice = (discount * total()) / 100;
  } else {
    discountPrice = discount * 100;
  }

  return discountPrice;
}

/**
 * Calculates the total taxes for selected items.
 * @returns {Array} An array of total taxes for each item.
 */
function itemTotalTaxes() {
  let selectedItems = calculationRefs?.props?.selectedItems;
  let taxes = [];

  if (isEmpty(selectedItems)) {
    return [];
  }

  selectedItems.map((val) => {
    val.taxes &&
      val.taxes.filter((tax) => {
        let hasSame = false;
        const {tax_type_id, id, amount} = tax;

        taxes = taxes.map((tax2) => {
          if ((tax_type_id || id) === tax2.tax_type_id) {
            hasSame = true;
            return {
              ...tax2,
              amount: amount + tax2.amount,
              tax_type_id: tax2.tax_type_id,
            };
          }
          return tax2;
        });

        if (!hasSame) {
          taxes.push({...tax, tax_type_id: tax_type_id || id});
        }
      });
  });

  return taxes;
}

/**
 * Calculates the subtotal including taxes and discounts.
 * @returns {number} The subtotal amount.
 */
function subTotal() {
  let tax = 0;
  itemTotalTaxes().filter((val) => (tax += val?.amount ?? 0));
  return total() + tax - totalDiscount();
}

/**
 * Retrieves the name of a tax based on its ID.
 * @param {Object} tax - The tax object.
 * @returns {string} The name of the tax.
 */
function getTaxName(tax) {
  if (hasValue(tax?.name)) {
    return tax.name;
  }

  const {taxTypes} = calculationRefs?.props;
  let taxName = '';
  const type = taxTypes.filter((val) => val.fullItem.id === tax.tax_type_id);

  if (type.length > 0) {
    taxName = type[0]['fullItem'].name;
  }
  return taxName;
}

/**
 * Formats a list of items for display.
 * @param {Array} items - The array of items to format.
 * @returns {Array} The formatted list of items.
 */
function getItemList(items) {
  if (isEmpty(items)) {
    return [];
  }

  return items.map((item) => {
    let {name, description, price, currency} = item;
    return {
      title: name,
      subtitle: {title: description},
      amount: price,
      currency,
      fullItem: item,
    };
  });
}

/**
 * Calculates the tax value based on the subtotal.
 * @param {number} tax - The tax percentage.
 * @returns {number} The calculated tax value.
 */
const getTaxValue = (tax = 0) => {
  return (tax * JSON.parse(subTotal())) / 100;
};

/**
 * Calculates the total amount including subtotal and tax.
 * @returns {number} The total amount.
 */
const totalAmount = () => subTotal() + tax();

/**
 * Calculates the final amount including total amount and compound tax.
 * @returns {number} The final amount.
 */
const finalAmount = () => totalAmount() + CompoundTax();

export {
  total,
  tax,
  CompoundTax,
  getCompoundTaxValue,
  subTotal,
  itemTotalTaxes,
  totalDiscount,
  getTaxValue,
  getTaxName,
  totalAmount,
  finalAmount,
  getItemList,
};
