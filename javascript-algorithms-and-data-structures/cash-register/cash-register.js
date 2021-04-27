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
  let cidValueInPennies = cid
  for (let i = 0; i < cidValueInPennies.length; i++) {
    cidValueInPennies[i][1] *= 100
    // console.log(cidValues[i][1])
  }

  let cidSum = 0
  for (let h = 0; h < cidValueInPennies.length; h++) {
    cidSum += cidValueInPennies[h][1]
  }

  if (cidSum == changeInPennies) {
    return {
      status: "CLOSED",
      change: cid
    }
  }  

  let change = []
  while (changeInPennies > 0) {
    for (let j = cidValueInPennies.length - 1; j >= 0; j--) {
      let placeholder = [cidValueInPennies[j][0], 0]
      // "while there is change in the drawer at the given currency and while a unit of the denomination can be subtracted from the change due..."
      while ((cidValueInPennies[j][1] > 0) && ((changeInPennies - DENOMINATIONS[j][1]) > 0)) {
        // subtract a unit of denomination from the change due
        changeInPennies -= DENOMINATIONS[j][1]
        // subtract a unit of denominations from the cash in drawer (values)
        cidValueInPennies[j][1] -= DENOMINATIONS[j][1]
        // add a unit of denomination to the placeholder
        placeholder[1] += DENOMINATIONS[j][1]
      }
      if (placeholder[1] > 0) {
        change.push(placeholder)
      }
    }
    // Cannot return exact change, or not enough cash in drawer
    if (changeInPennies > 0) {
      return {
        status: "INSUFFICIENT_FUNDS",
        change: []
      }
    }
  }
  console.log(change)
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);