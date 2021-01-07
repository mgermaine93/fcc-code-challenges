// Design a cash register function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency

// The checkCashRegister() function should always return an object with a "status" key and a "change" key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} is cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the "change" key

function checkCashRegister(price, cash, cid) {
  let priceInPennies = price * 100;
  let cashInPennies = cash * 100;
  let changeInPennies = cashInPennies - priceInPennies;
  // This is what will ultimately be returned at the end of checkCashRegister
  let output = {
    status: "",
    change: [],
  };
  // This provides the value of each form of currency in pennies
  // let currencyValuesInPennies = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];

  function getValueInPenniesInRegister(cid) {
    let valueInPenniesArray = [];
    for (let i = 0; i < cid.length; i++) {
      valueInPenniesArray.push(Math.round(cid[i][1] * 100));
    }
    return valueInPenniesArray;
  }
  // Tests the function
  console.log(getValueInPenniesInRegister());

  // This returns an integer representing the value in pennies of the money in the register
  function sumValueInPenniesInRegister(cid) {
    let cidInPennies = getValueInPenniesInRegister(cid);
    let sumValueInPennies = 0;
    for (let i = 0; i < cidInPennies.length; i++) {
      sumValueInPennies += cidInPennies[i];
    }
    return sumValueInPennies; // Returns an integer
  }
}

// This returns an integer representing the value in pennies of the money in the register
function sumValueInPenniesInRegister(cid) {
  let cidInPennies = getValueInPenniesInRegister(cid);
  let sumValueInPennies = 0;
  for (let i = 0; i < cidInPennies.length; i++) {
    sumValueInPennies += cidInPennies[i];
  }
  return sumValueInPennies; // Returns an integer
}

//   function findStatus(cid) {
//     let sumValueInPennies = sumValueInPenniesInRegister(cid);
//     if (changeInPennies > sumValueInPennies) {
//       // There is not enough cash in the drawer to make change
//       status = "INSUFFICIENT_FUNDS";
//     } else if (changeInPennies === sumValueInPennies) {
//       status = "CLOSED";
//     } else {
//       status = "OPEN";
//     }
//   }
//   function findChange() {}

//   return findStatus(cid);
//   // return moneyInRegister(cid);
// }

// let cid = ;

module.exports = checkCashRegister;
