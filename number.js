// enforce use strict globally
'use strict';

const Big = require('big.js');

let test;

test = (function() {
  // console.log(0.2 + 0.1);

  let x = new Big(0.2);

  let bigResult = x.plus(0.1);
  console.log(bigResult.toString());

  let numberResult = Number(bigResult);
  console.log(numberResult);

  let floatResult = parseFloat(bigResult);
  console.log(floatResult);
});
// test.call();

test = (function() {
  // console.log(31/60 * 60);

  let x = new Big(31);

  let bigResult = x.div(60).times(60).round();
  console.log(bigResult.toString());

  let numberResult = Number(bigResult);
  console.log(numberResult);

  let floatResult = parseFloat(bigResult);
  console.log(floatResult);
});
test.call();
