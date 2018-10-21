// enforce use strict globally
'use strict';

let test;

test = (() => {
  const add = (x) => {
    let total = 0;
    return () => {
      total += x;
      return total;
    };
  };
  console.log(add);
  console.log(add(1));
  console.log(add(2).call());
  console.log(add(3).call());
});
test.call();

test = (() => {
  const add = ((x) => {
    let total = 0;
    total += (() => {
      return (total + x);
    })();
    return total;
  });
  console.log(add);
  console.log(add(1));
  console.log(add(2));
});
test.call();

test = (() => {
  const add = (() => {
    let total = 0;
    return ((x) => {
      total += x;
      return total;
    })
  })();
  console.log(add);
  console.log(add(1));
  console.log(add.call(null,2));
  console.log(add(3));
});
test.call();

test = (() => {
  let math = {
    total: 0,
    add: (x) => {
      math.total += x;
      return math.total;
    },
    minus: (x) => {
      math.total -= x;
      return math.total;
    }
  };
  console.log(math.add(1));
  console.log(math.add(2));
  console.log(math.add(3));
  console.log(math.minus(3));
  console.log(math.minus(2));
});
test.call();
