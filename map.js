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

  let array = [...map];
  console.log(array);
  console.log(array.length);

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
  // let jsonString = "{\"1\":{\"id\":1,\"name\":\"test1\"}}";
  let jsonString = "{}"
  let obj = JSON.parse(jsonString);
  console.log(`obj == null ? ${obj == null}`)
  console.log(Object.entries(obj));

  let map = new Map(Object.entries(obj));
  console.log(`map == null ? ${map == null}`);
  console.log(`map.size ? ${map.size}`);

  let iterator = map.values();
  var result = iterator.next();
  while(!result.done) {
    console.log(result.value);
    result = iterator.next();
  }
  console.log("iterated over sequence of size: " +  map.size);
});
// test.call();

test = (function() {
  let map = new Map();
  map.set("1",{id:"1"});
  map.set("2",{id:"2"});
  map.set("3",{id:"3"});
  map.set("4",{id:"4"});
  console.log(map.size);

  let iterator = map.values();
  var result = iterator.next();
  while(!result.done) {
    if (result.value.id == "2") {
      map.delete("2")
    }
    result = iterator.next();
  }

  console.log(map.size);
  console.log(map.values());
});
// test.call();

test = (function() {
  let map1 = new Map();
  map1.set("1",{id:"1"});

  let map2 = new Map();
  map2.set("2",{id:"2"});

  let map = new Map([...map1, ...map2]);
  console.log(map.size);
  console.log(map.values());
});
// test.call();

test = (function() {
  let map = new Map();
  map.set("1",{id:"1",name:"name-1"});
  map.set("2",{id:"2",name:null});
  map.set("3",{id:null,name:"name-3"});
  map.set(null,{id:"4",name:"name-4"});
  console.log(map.size);

  let filteredResult = [...map.entries()].filter(item => {
    return (item[0]!=null && item[1]["id"]!=null && item[1]["name"]!=null);
  });

  let filteredMap = new Map(filteredResult);
  console.log(filteredMap.size);
  console.log(filteredMap.values());
});
test.call();
