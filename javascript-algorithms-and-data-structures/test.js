// function getValueInPenniesInRegister(cid) {
//   let valueInPenniesArray = [];
//   for (let i = 0; i < cid.length; i++) {
//     // valueInPenniesArray.push(Math.round(cid[i][1] * 100));
//     valueInPenniesArray.push([i]);
//   }
//   // console.log(valueInPenniesArray);
//   return valueInPenniesArray;
// }
// getValueInPenniesInRegister([
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100],
// ]);

function trueOrFalse() {
  let value = 2;
  if (value > 1) {
    return "Something";
  } else {
    return "Something else";
  }
}
console.log(trueOrFalse());
