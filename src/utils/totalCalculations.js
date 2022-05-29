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
  static grandTotal = 0.0;

  constructor(
    items,
    discountOn,
    deliveryOn,
    discountType,
    deliveryType,
    discountPercent,
    deliveryFee,
    taxPercent
  ) {
    Totals.items = items;
    Totals.discountOn = discountOn;
    Totals.deliveryOn = deliveryOn;
    Totals.discountType = discountType;
    Totals.deliveryType = deliveryType;
    Totals.discountPercent = discountPercent;
    Totals.deliveryFee = deliveryFee;
    Totals.taxPercent = taxPercent;
  }

  static getSubTotal() {
    let subTotal = 0.0;
    if (Totals.items.length > 0) {
      for (let i = 0; i < Totals.items.length; i++) {
        subTotal += Totals.items[i].price * Totals.items[i].quantity;
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
    if (discountOn && deliveryOn && discountType === "before tax") {
      return (Totals.tax = (subTotal * (1 - discountPercent) + deliveryFee) * taxPercent);
    } else if (discountOn && discountType === "before tax") {
      return (Totals.tax = subTotal * (1 - discountPercent) * taxPercent);
    } else if (deliveryOn && deliveryType === "before tax") {
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

  static getGrandTotal() {
    let { subTotal, tax, discount, discountOn, deliveryFee, deliveryOn, deliveryType } = Totals;
    if (discountOn) {
      return (Totals.grandTotal = subTotal + tax - discount);
    } else if (deliveryOn && deliveryType === "after tax") {
      return (Totals.grandTotal = subTotal + tax + deliveryFee);
    } else {
      return (Totals.grandTotal = subTotal + tax);
    }
  }

  static getTotals() {
    Totals.getSubTotal();
    Totals.getTax();
    Totals.getDiscount();
    Totals.getGrandTotal();
    let { subTotal, tax, discount, grandTotal } = Totals;
    return {
      subTotal: subTotal.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };
  }
}
