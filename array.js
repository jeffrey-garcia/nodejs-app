// enforce use strict globally
'use strict';

let test;

test = (function() {
  let array = [];
  array = [5,4,7,1,3];
  array.sort();
  console.log(array);
});
test.call();

test = (function() {
  // defines the person object
  let Person = {
    name: '',
    age: 0
  };
  // console.log(Person);

  let p1 = Object.assign(Object.create(Person), {name:'J', age:12, gender:'M'});
  let p2 = Object.assign(Object.create({}), p1, {name:'A', age:37}); // mixin
  // console.log(p1);
  // console.log(p2);

  let personFactory = (function() {
    return (function(_name, _age) {
      return Object.assign(Object.create(Person), {name:_name,age:_age});
    });
  })();

  let p3 = personFactory('O',28);
  // console.log(p3);

  // console.log(Object.getPrototypeOf(p1));
  // console.log(Object.getPrototypeOf(p2));
  // console.log(p1 == Object.getPrototypeOf(p2));

  // sorting object array
  let array = [p1, p2, p3];
  console.log(array);

  // sort by age
  array.sort(function(p1,p2) {
    return p1.age - p2.age;
  });
  console.log(array);

  // sort by name
  array.sort(function(p1,p2) {
    if (p1.name > p2.name) {
      return 1;
    } else if (p1.name < p2.name) {
      return -1;
    } else {
      return 0;
    }
  });
  console.log(array);
});
test.call();

test = (function() {
  let array = [];
  array = [5,4,7,1,3];

  let _array;

  _array = array.filter(item => {
    return item %2 == 1;
  });
  console.log(_array);

  _array = array.find(item => {
    return item == 5;
  });
  console.log(_array);

  _array = array.map(item => {
    return item*2
  })
  console.log(_array);

  let sum = array.reduce((total, current) => {
    return total + current;
  })
  console.log(sum);


});
test.call();
