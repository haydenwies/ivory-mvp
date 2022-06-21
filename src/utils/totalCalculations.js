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
    taxPercent
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

        // Sums up the modifier costs
        if (Totals.items[i].hasOwnProperty("modifiers")) {
          //Checks if there is a modifiers property
          if (Totals.items[i].flatFeeModifierOn) {
            //Check if there is a one time flat fee
            // If the flat fee is greater than zero add the sum of the flat fee.
            if (Totals.items[i].flatFeeModifier > 0) {
              subTotal += parseFloat(Totals.items[i].flatFeeModifier);
            }
            for (let k = 0; k < Totals.items[i].modifiers.length; k++) {
              if (Totals.items[i].modifiers[k].type === "swap") {
                subTotal += parseFloat(Totals.items[i].modifiers[k].price);
              }
            }
          } else {
            for (let j = 0; j < Totals.items[i].modifiers.length; j++) {
              subTotal += Totals.items[i].modifiers[j].price;
            }
          }
        }
      }
    }

    Totals.subTotal = subTotal;
    return Totals.subTotal;
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
    if (discountOn && !deliveryOn) {
      // Discount On, delivery Off
      return (Totals.total = subTotal + tax - discount);
    } else if (discountOn && deliveryOn) {
    console.log("HI WE SHOULD EB RUNINNING")

      //Delivery && Delivery on
      return (Totals.total = subTotal + tax + deliveryFee - discount);
    } else if (!discountOn && deliveryOn) {
      //Discount off, delivery on
      return (Totals.total = subTotal + tax + deliveryFee);
    } else {
      //If both discount and delivery are off
      return (Totals.total = subTotal + tax);
    }
    // Checks if delivery is added before tax
    // if (Totals.deliveryOn && Totals.deliveryType === "BEFORE_TAX") {
    //   subTotal += Totals.deliveryFee;
    // }
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
      subTotal: `${subTotal.toFixed(2)}`,
      tax: `${tax.toFixed(2)}`,
      discount: `${discount.toFixed(2)}`,
      total: getPrecision(`${total.toFixed(2)}`),
    };
  }
}
