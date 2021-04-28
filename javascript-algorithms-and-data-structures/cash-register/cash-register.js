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
    ["ONE HUNDRED", 10000],
  ]
  
  let priceInPennies = price * 100;
  let cashInPennies = cash * 100;
  let changeInPennies = Math.floor(cashInPennies - priceInPennies);

  // thanks to https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
  let cidValueInPennies = JSON.parse(JSON.stringify(cid))

  // This sets the cash in drawer amounts equal to values in pennies
  for (let i = 0; i < cid.length; i++) {
    cidValueInPennies[i][1] = Math.round(cid[i][1] * 100)
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
      while ((cidValueInPennies[j][1] > 0) && ((changeInPennies - DENOMINATIONS[j][1]) >= 0)) {
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
  // This returns the values in pennies back to the original amounts
  let finalChange = JSON.parse(JSON.stringify(change))
  for (let m = 0; m < finalChange.length; m++) {
    finalChange[m][1] = (finalChange[m][1] / 100)
  }
  return({
      status: "OPEN",
      change: finalChange
    })
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])