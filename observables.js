// enforce use strict globally
'use strict';

// Import all core functionality
const Rx = require('rxjs/Rx');

const dummyRestApi = (function(i) {
  console.log("response data for " + i);
  return i;
});

const dummyRestApiObservable = (function(i) {
  return Rx.Observable.of(dummyRestApi(i*2)).delay(i*1000);
});

let test;

test = (function() {
  let promise = new Promise(function(resolve, reject) {
    // do the async operation here
    let result = dummyRestApiObservable(1).toPromise();

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
    (result) => {
      console.log("rest result: " + result)
    },
    (err) => {
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
  // execute commands upon the observable stream and execute them in parallel
  // and combine their results to an array
  // note that order of the response data WILL be preserved
  Rx.Observable.from([4,2,3,1])
    .map(i => dummyRestApiObservable(i))
    .combineAll()
    .subscribe(
      (result) => {
        console.log("rest result: " + result)
      },
      (err) => {
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
  const input1 = dummyRestApiObservable(2);
  const input2 = dummyRestApiObservable(1);

  // execute multiple commands in parallel and combine their results to an array
  // note that order of the response data WILL be preserved
  Rx.Observable.forkJoin(input1,input2)
  .subscribe(
    (result) => {
      console.log("rest result: " + result)
    },
    (err) => {
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
  const input1 = dummyRestApiObservable(1);
  const input2 = dummyRestApiObservable(2);

  // execute multiple commands in parallel and combine their results to an array
  // note that order of the response data will NOT be preserved
  Rx.Observable.combineLatest(input2, input1)
  .subscribe(
    (result) => {
      console.log("rest result: " + result);
    },
    (err) => {
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
  // chain the commands after the observable stream and execute them sequentially
  // only the response data of the last executed command will be returned
  Rx.Observable.from([1])
    .mergeMap(i => dummyRestApiObservable(i))
    .mergeMap(j => dummyRestApiObservable(j)) // the input of this command depends on the result of previous
    .subscribe(
      (result) => {
        console.log("rest result: " + result);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // default work when observable complete
        console.log("finished");
      }
    );
})
// test.call();
