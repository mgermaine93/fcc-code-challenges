// Design a cash register function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency

// The checkCashRegister() function should always return an object with a "status" key and a "change" key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} is cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the "change" key


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
  
  // console.log(DENOMINATIONS[8])
  let priceInPennies = price * 100;
  let cashInPennies = cash * 100;
  let changeInPennies = Math.floor(cashInPennies - priceInPennies);

  // This sets the cash in drawer amounts equal to values in pennies
  let cidValues = cid
  for (let h = 0; h < cidValues.length; h++) {
    cidValues[h][1] *= 100
  }

  let change = []
  while (changeInPennies > 0) {
  // while changeInPennies is greater than zero...
    // Iterate through the cash in drawer, highest to lowest
    for (let i = cidValues.length - 1; i >= 0; i--) {
      //console.log(cidValues[i])
      let placeholder = [cidValues[i][0], 0]
      //console.log(i)
      while ((cidValues[i][1] > 0) && (changeInPennies - DENOMINATIONS[i][1]) >= 0) {
        // If one denomination of the currency contributes to the change, add it
        placeholder[1] += DENOMINATIONS[i][1]
        cidValues -= DENOMINATIONS[i][1]
        changeInPennies -= DENOMINATIONS[i][1]
      }
      // If there's change to give in a certain denominations, add it to the change to be returned
      //console.log(placeholder)
      // if (placeholder[1] > 0) {
      //   console.log("Yo")
      //   change.append(placeholder)
      // }
    }
    console.log("Yo")
  }
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// module.exports = checkCashRegister;
