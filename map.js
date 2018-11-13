// enforce use strict globally
'use strict';

let test;

test = (function() {
  let array = [];
  array = [5,4,7,1,3];

  let _map = new Map();
  array.forEach(item => {
    _map.set(item, item);
  });

  let iterator = _map.keys();
  var result = iterator.next();
  while(!result.done) {
    console.log(result.value); // 5,4,7,1,3
    result = iterator.next();
  }
  console.log("iterated over sequence of size: " +  _map.size);
});
// test.call();

test = (function() {
  let array = [];
  array = [5,4,7,1,3];

  let _map = new Map();
  array.forEach(item => {
    _map.set(item, item);
  });

  let _mapNew = new Map(_map);
  _mapNew.set(9,9);

  console.log("original map: " + _map.size);
  console.log("new map: " + _mapNew.size);
});
// test.call();

test = (function() {
  let map = new Map();
  map.set(1, Object.assign({},{id:1}));
  map.set(2, Object.assign({},{id:2}));

  let array = [...map.entries()];
  // console.log(array);

  let _map = new Map(array);
  // console.log(_map);
  _map.set(1, Object.assign({},{id:"1"}));

  console.log(_map);
  console.log(map);
});
test.call();
