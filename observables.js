// enforce use strict globally
'use strict';

// Import all core functionality
const Rx = require('rxjs/Rx');

const dummyRestApi = (function(i) {
  console.log(i);
  return "response data for " + i;
});

const dummyRestApiObservable = (function(i) {
  return Rx.Observable.of(dummyRestApi(i)).delay(2000);
});

let test;

test = (function() {
  let promise = new Promise(function(resolve, reject) {
    // do the async operation here
    let result = dummyRestApi(1);

    if (result) { // result is successful
      resolve(result);
    } else {
      reject(Error("error"));
    }
  });
  promise.then(function(data) {
    console.log(data);
  });
});
// test.call();

test = (function() {
  dummyRestApiObservable(1).subscribe(
    data => {
      console.log("rest result: " + data)
    },
    err => {
      console.log(err);
    },
    () => {
      // default work when observable complete
      console.log("finished");
    }
  );
});
// test.call();

test = (function() {
  Rx.Observable.from([1,2,3,4])
    .map(i => dummyRestApiObservable(i))
    .mergeMap(i => dummyRestApiObservable(8))
    .subscribe(
      data => {
        console.log("rest result: " + data)
      },
      err => {
        console.log(err);
      },
      () => {
        // default work when observable complete
        console.log("finished");
      }
    );
});
test.call();

test = (function() {
  Rx.Observable.from([1,2,3,4])
    .mergeMap(i => dummyRestApiObservable(i))
    .subscribe(
      data => {
        console.log("rest result: " + data)
      },
      err => {
        console.log(err);
      },
      () => {
        // default work when observable complete
        console.log("finished");
      }
    );
});
// test.call();
