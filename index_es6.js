// enforce use strict globally
'use strict';

const test1 = (() => {
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
test1.call();

const test2 = (() => {
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
test2.call();

const test3 = (() => {
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
test3.call();

const test4 = (() => {
  let math = {
    total: 0,
    add: (x) => {
      math.total += x;
      return math.total;
    }
  };
  console.log(math.add(1));
  console.log(math.add(2));
  console.log(math.add(3));
});
test4.call();
