function checkCashRegister(price, cash, cid) {

  // this will NOT change
  const DENOMINATIONS = [
    ["PENNY", 1],
    ["NICKEL", 5],
    ["DIME", 10],
    ["QUARTER", 25],
    ["ONE", 100],
    ["FIVE", 500],
    ["TEN", 1000],
    ["TWENTY", 2000],
    ["ONE HUNDRED", 1000],
  ]
  
  let priceInPennies = price * 100;
  let cashInPennies = cash * 100;
  let changeInPennies = Math.floor(cashInPennies - priceInPennies);

  // This sets the cash in drawer amounts equal to values in pennies
  let cidValues = cid
  for (let i = 0; i < cidValues.length; i++) {
    cidValues[i][1] *= 100
    // console.log(cidValues[i][1])
  }

  //console.log(cidValues[4])

  let change = []
  while (changeInPennies > 0) {
    for (let j = cidValues.length - 1; j >= 0; j--) {
      console.log(cidValues[j][1])
      let placeholder = [cidValues[j][0], 0]
      // "while there is change in the drawer at the given currency and while a unit of the denomination can be subtracted from the change due..."
      while ((cidValues[j][1] > 0) && (changeInPennies - DENOMINATIONS[j][1])) {
        // subtract a unit of denomination from the change due
        changeInPennies -= DENOMINATIONS[j][1]
        // subtract a unit of denominations from the cash in drawer (values)
        cidValues -= DENOMINATIONS[j][1]
        // add a unit of denomination to the placeholder
        placeholder[1] += DENOMINATIONS[j][1]
      }
      if (placeholder[1] > 0) {
        change.append(placeholder)
      }
    }
  }
  
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);