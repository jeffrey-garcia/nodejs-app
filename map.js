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
test.call();

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
  console.log(array);

  let _map = new Map(array);
  // console.log(_map);
  _map.set(1, Object.assign({},{id:"1"}));

  console.log(_map);
  console.log(map);
});
// test.call();

test = (function() {
  let lead1 = Object.assign({},{id:'1',name:'test1'});
  let lead2 = Object.assign({},{id:'2',name:'test2'});

  let map = new Map();
  map.set(lead1.id, lead1);
  map.set(lead2.id, lead2);

  let jsonString = JSON.stringify([...map.entries()]);
  console.log(jsonString);

  let arr = JSON.parse(jsonString);
  let _map = new Map(arr);
  console.log(_map.size);
});
// test.call();

test = (function() {
  let lead1 = Object.assign({},{id:1,name:'test1'});
  let lead2 = Object.assign({},{id:2,name:'test2'});

  let arr = [];
  arr.push(lead1);
  arr.push(lead2);

  let jsonString = JSON.stringify(arr);
  console.log(jsonString);

  let _arr = JSON.parse(jsonString);
  console.log(_arr.length);
});
// test.call();

test = (function() {
  let jsonString = "{\"1\":{\"id\":1,\"name\":\"test1\"}}";
  let obj = JSON.parse(jsonString);
  console.log(Object.entries(obj));

  let map = new Map(Object.entries(obj));

  let iterator = map.values();
  var result = iterator.next();
  while(!result.done) {
    console.log(result.value);
    result = iterator.next();
  }
  console.log("iterated over sequence of size: " +  map.size);
});
// test.call();
