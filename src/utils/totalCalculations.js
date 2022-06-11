export class Totals {
  static items = [];
  static discountOn = false;
  static deliveryOn = false;
  static discountPercent = 0.0;
  static deliveryFee = 0.0;
  static taxPercent = 0.0;
  static subTotal = 0.0;
  static tax = 0.0;
  static discount = 0.0;
  static total = 0.0;

  constructor(
    items,
    discountOn,
    deliveryOn,
    discountType,
    deliveryType,
    discountPercent,
    deliveryFee,
    taxPercent,
    flatFeeModifier
  ) {
    Totals.items = items;
    Totals.discountOn = discountOn;
    Totals.deliveryOn = deliveryOn;
    Totals.discountType = discountType;
    Totals.deliveryType = deliveryType;
    Totals.discountPercent = parseFloat(discountPercent);
    Totals.deliveryFee = parseFloat(deliveryFee);
    Totals.taxPercent = parseFloat(taxPercent);
  }

  static getSubTotal() {
    let subTotal = 0.0;
    if (Totals.items.length > 0) {
      for (let i = 0; i < Totals.items.length; i++) {
        subTotal += Totals.items[i].price * Totals.items[i].quantity;

        if (Totals.items[i].hasOwnProperty("modifiers")) {
          if (Totals.items[i].flatFeeModifierOn) {
            if (Totals.items[i].flatFeeModifier > 0) {
              subTotal += parseFloat(Totals.items[i].flatFeeModifier);
            }
          } else {
            for (let j = 0; j < Totals.items[i].modifiers.length; j++) {
              subTotal += Totals.items[i].modifiers[j].price;
            }
          }
        }
      }
      Totals.subTotal = subTotal;
      return Totals.subTotal;
    } else {
      Totals.subTotal = 0.0;
      return Totals.subTotal;
    }
  }

  static getTax() {
    let {
      deliveryFee,
      discountPercent,
      subTotal,
      discountOn,
      deliveryOn,
      discountType,
      deliveryType,
      taxPercent,
    } = Totals;
    if (discountOn && deliveryOn && discountType === "BEFORE_TAX") {
      return (Totals.tax = (subTotal * (1 - discountPercent) + deliveryFee) * taxPercent);
    } else if (discountOn && discountType === "BEFORE_TAX") {
      return (Totals.tax = subTotal * (1 - discountPercent) * taxPercent);
    } else if (deliveryOn && deliveryType === "BEFORE_TAX") {
      return (Totals.tax = (subTotal + deliveryFee) * taxPercent);
    } else {
      return (Totals.tax = subTotal * taxPercent);
    }
  }

  static getDiscount() {
    const { subTotal, discountPercent, discountOn } = Totals;

    if (discountOn) {
      return (Totals.discount = subTotal * discountPercent);
    }
  }

  static getTotal() {
    let { subTotal, tax, discount, discountOn, deliveryFee, deliveryOn, deliveryType } = Totals;
    if (discountOn) {
      return (Totals.total = subTotal + tax - discount);
    } else if (deliveryOn && deliveryType === "AFTER_TAX") {
      return (Totals.total = subTotal + tax + deliveryFee);
    } else {
      return (Totals.total = subTotal + tax);
    }
  }

  static getTotals() {
    Totals.getSubTotal();
    Totals.getTax();
    Totals.getDiscount();
    Totals.getTotal();
    let { subTotal, tax, discount, total } = Totals;

    const getPrecision = (strNum) => {
      if (strNum.indexOf(".") === -1) {
        return parseFloat(strNum).toFixed(2);
      } else {
        return parseFloat(`${strNum}1`).toFixed(2);
      }
    };

    return {
      subTotal: getPrecision(`${subTotal.toFixed(2)}`),
      tax: getPrecision(`${tax.toFixed(2)}`),
      discount: getPrecision(`${discount.toFixed(2)}`),
      total: getPrecision(`${total.toFixed(2)}`),
    };
  }
}
