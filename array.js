// enforce use strict globally
'use strict';

let test;

test = (function() {
  let array = [];
  array = [5,4,7,1,3];
  array.sort();
  console.log(array);
});
// test.call();

test = (function() {
  // defines the person object
  let Person = {
    id: '',
    name: '',
    age: 0
  };
  // console.log(Person);

  let p1 = Object.assign(Object.create(Person), {id:'1', name:'J', age:12, gender:'M'});
  let p2 = Object.assign(Object.create({}), p1, {id:'2', name:'A', age:37}); // mixin
  let p3 = Object.assign(Object.create({}), p1, {id:'3', name:'O', age:28}); // mixin

  let array = [p1, p2, p3];
  console.log(array);

  // search for p2 element in array and remove it
  let index = array.findIndex((item) => {
    return item.id == '999';
  });
  console.log(`found index ${index}`);

  if (index > -1) {
    array.splice(index, 1);
  }
  console.log(array);
})
// test.call();

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
  // console.log(Object.getPrototypeOf(p1));
  // console.log(p2);
  // console.log(Object.getPrototypeOf(p2));

  let personFactory = (function() {
    return (function(_name, _age) {
      return Object.assign(Object.create(Person), {name:_name,age:_age});
    });
  })();

  let p3 = personFactory('O',28);
  // console.log(p3);
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
// test.call();

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
  });
  console.log(_array);

  let sum = array.reduce((total, current) => {
    return total + current;
  });
  console.log(sum);
});
// test.call();

test = (function() {
  let array = [];
  array.push(1);
  array.push(5);
  array.push(3);
  array.push(5);
  array.push(7);
  console.log(array);
  console.log(array[array.length-1]);

  array.pop();
  console.log(array);
});
// test.call();

test = (function() {
  let array = [];
  array = [5,4,7,1,3];

  let _map;

  _map = new Map();
  array.forEach(item => {
    _map.set(item, item);
  });
  console.log(_map);

  let _array;
  _array = Array.from(_map.values());
  console.log(_array);

  _map.clear();
  _array = _array.concat([3,1,6,5,3]);
  console.log(_array);
  _array.forEach(item => {
    var count = _map.get(item);
    if (count == null) {
      _map.set(item, 1);
    } else {
      _map.set(item, ++count);
    }
  });
  console.log(_map);
});
// test.call();

test = (function() {
  let array = [];

  let lead = {
    phone: [
      {
        phoneNumber: "123456"
      },
      {
        name: "test"
      },
      {
        phoneNumber: "333444"
      },
    ]
  }
  lead.phone.push({});
  console.log(`lead phone: ${JSON.stringify(lead.phone)}`);

  array = lead.phone.map((phone) => {
    // console.log(`${phone.phoneNumber}`);
    return phone["phoneNumber"];
  })
  console.log(`filtered phone array: ${array}`);
});
test.call();
