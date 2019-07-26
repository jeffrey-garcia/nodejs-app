// enforce use strict globally
'use strict';

// Import all core functionality
const Rx = require('rxjs/Rx');
const tap = require('rxjs/operators/tap').tap;

const dummyRestApi = (function(i) {
  console.log("response data for " + i);
  return i;
});

const testError = (function() {
  return Rx.Observable.throwError("An error has occurred!");
});

const dummyRestApiObservable = (function(i) {
  if (i <= 0) {
    return Rx.Observable.throwError("An error has occurred!").pipe(
      tap(
        (response) => {
          // intercept the response
        },
        (error) => {
          // intercept the error
        }
      )
    );
  } else {
    return Rx.Observable.of(dummyRestApi(i*2)).delay(i*1000);
  }
});

let test;

test = (function() {
  let promise = new Promise(function(resolve, reject) {
    // do the async operation here
    let result = dummyRestApiObservable(2).toPromise();

    if (result) { // result is successful
      resolve(result);
    } else {
      reject(Error("error"));
    }
  });
  promise.then(function(result) {
    console.log("rest result: " + result)
  }).catch(function(err) {
    console.log("error: " + err.message);
  });
});
// test.call();

test = (function() {
  dummyRestApiObservable(-1).subscribe(
    (result) => {
      console.log("rest result: " + result);
    },
    (error) => {
      console.log("error: " + error);
    },
    () => {
      // only prints when no error is thrown
      console.log("finished");
    }
  );
});
// test.call();

test = (function() {
  dummyRestApiObservable(2)
  .mergeMap(response => dummyRestApiObservable(1)) // only executes when the command prior succeeds
  .subscribe(
    (respone) => {
      console.log(`onNext: ${respone}`);
    },
    (error) => {
      console.log(`onError: ${error}`);
    },
    () => {
      console.log(`onCompleted`);
    }
  );
});
// test.call();

test = (function() {
  let subscriber = Rx.Observable.create(
    (observer) => {
      dummyRestApiObservable(-1)
      .finally(
        () => {
          dummyRestApiObservable(1).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
              observer.complete();
            }
          );
        }
      )
      .subscribe(
        (respone) => {
          console.log(`test-1 onNext: ${respone}`);
        },
        (error) => {
          console.log(`test-1 onError: ${error}`);
        },
        () => {
          console.log(`test-1 onCompleted`);
        }
      );
    }
  );

  subscriber.subscribe(
    (respone) => {
      console.log(`test-2 onNext: ${respone}`);
    },
    (error) => {
      console.log(`test-2 onError: ${error}`);
    },
    () => {
      // only prints when no error is thrown
      console.log(`test-2 onCompleted`);
    }
  );
})
// test.call();

test = (function() {
  // execute commands upon the observable stream and execute them in parallel
  // and combine their results to an array
  // note that order of the response data WILL be preserved
  // if error occurs in any of the chained command, the error WILL be handled by the subscriber,
  // all the previous completed output will be lost
  Rx.Observable.from([4,2,3,1])
    .map(i => dummyRestApiObservable(i))
    .combineAll()
    .subscribe(
      (result) => {
        console.log("rest result: " + result)
      },
      (error) => {
        console.log("error: " + error);
      },
      () => {
        // only prints when no error is thrown
        console.log("finished");
      }
    );
});
// test.call();

// execute multiple commands in sequentially and combine their results to an array
// only the response data of the last executed command will be returned
// if error occurs in any of the command, the error will be handled by the subscriber,
// all the previous completed output will be lost
test = (function() {
  dummyRestApiObservable(3).concatMap(
    (response) => {
      return dummyRestApiObservable(1);
    }
  ).subscribe(
    (result) => {
      console.log("rest result: " + result)
    },
    (error) => {
      console.log("error: " + error);
    },
    () => {
      // only prints when no error is thrown
      console.log("finished");
    }
  )
});
// test.call();

test = (function() {
  const input1 = dummyRestApiObservable(3);
  const input2 = dummyRestApiObservable(1);

  // execute multiple commands in parallel and combine their results to an array
  // note that order of the response data WILL be preserved
  // if error occurs in any of the command, the error will be handled by the subscriber,
  // all the previous completed output will be lost
  Rx.Observable.forkJoin(input1,input2)
  .subscribe(
    (result) => {
      console.log("rest result: " + result)
    },
    (error) => {
      console.log("error: " + error);
    },
    () => {
      // only prints when no error is thrown
      console.log("finished");
    }
  );
});
test.call();

test = (function() {
  const input1 = dummyRestApiObservable(1);
  const input2 = dummyRestApiObservable(2);

  // execute multiple commands in parallel and combine their results to an array
  // note that order of the response data will NOT be preserved
  // if error occurs in any of the command, the error will be handled by the subscriber,
  // all the previous completed output will be lost
  Rx.Observable.combineLatest(input2, input1)
  .subscribe(
    (result) => {
      console.log("rest result: " + result);
    },
    (error) => {
      console.log("error: " + error);
    },
    () => {
      // only prints when no error is thrown
      console.log("finished");
    }
  );
});
// test.call();

test = (function() {
  // chain the commands after the observable stream and execute them sequentially
  // only the response data of the last executed command will be returned
  // if error occurs in any of the chained command, the error WILL be handled by the subscriber,
  // all the previous completed output will be lost
  Rx.Observable.from([1])
    .mergeMap(i => dummyRestApiObservable(i))
    .mergeMap(j => dummyRestApiObservable(j)) // the input of this command depends on the result of previous
    .subscribe(
      (result) => {
        console.log("rest result: " + result);
      },
      (error) => {
        console.log("error: " + error);
      },
      () => {
        // only prints when no error is thrown
        console.log("finished");
      }
    );
});
// test.call();

test = (function() {
  var state = new Rx.Subject();
  var $stateObserver = state.asObservable();

  $stateObserver.subscribe(
    (result) => {
      console.log("rest result: " + result);
    },
    (error) => {
      console.log("error: " + error);
    },
    () => {
      // only prints when no error is thrown
      console.log("finished");
    }
  )

  state.next(1);
  state.next(2);
});
// test.call();

test = (function() {
  var state = new Rx.BehaviorSubject(null);
  var $stateObserver = state.asObservable();

  $stateObserver.subscribe(
    (result) => {
      if (result) {
        console.log("rest result: " + result);
      }
    },
    (error) => {
      console.log("error: " + error);
    },
    () => {
      // only prints when no error is thrown
      console.log("finished");
    }
  )

  state.next(1);
  state.next(2);

  console.log("current state value: " + state.getValue());
});
// test.call();

test = (function() {

  let digitalLeadComponent = {
    getStore: function() {
      let store = {
        name: "digitalLeadStore"
      };
      return store;
    }
  };
  //console.log(`store name: ${digitalLeadComponent.getStore().name}`);

  let loadModule = (function() {
    return Rx.Observable.create(
      (observer) => {
        let component = Object.assign({}, digitalLeadComponent);
        observer.next(component);
        observer.complete();
      }
    ).delay(2000); // simulate hard-delay 2s
  });

  let loadComponentFactory = (function() {
    let $component = null;

    return (function(callerId) {
      console.log(`calling from: ${callerId}`);

      if ($component == null) {
        $component = new Rx.BehaviorSubject(null);
        console.log("initialization in progress ...");
        loadModule().subscribe(
          (component) => {
            console.log("initialization completed successfully");
            $component.next(component);
          },
          (error) => {
            console.log("error");
          },
          () => {}
        )
      }

      return Rx.Observable.create(
        (observer) => {
          $component.subscribe(
            (component) => {
              if (component != null) {
                // emit only if component value has been initialized
                observer.next(component);
                observer.complete();
              }
            }
          )
        }
      );
    });

  })();

  loadComponentFactory(1).subscribe(
    (component) => {
      console.log(component.getStore());
    }
  );
  loadComponentFactory(2).subscribe(
    (component) => {
      console.log(component.getStore());
    }
  );
  loadComponentFactory(3).subscribe(
    (component) => {
      console.log(component.getStore());
    }
  );

});
// test.call();
