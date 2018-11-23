// enforce use strict globally
'use strict';

let test;

test = (function() {

  const ticker = (function(initialCount) {
    var counter = initialCount;
    console.log(counter);

    let countdown = function() {
      counter -= 1;
      console.log(counter);

      if (counter > 0) {
        setTimeout(() => countdown(), 1000);
      }
    };
    setTimeout(() => countdown(), 1000);
  });

  ticker(5);
});
test.call();
