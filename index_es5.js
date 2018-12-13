// enforce use strict globally
'use strict';

var test;

test = (function() {
  /**
  * declare a variable add that is assigned to an anonymous function's expression which
  * returns an inner anonymous function's expression
  */
  var add = function(x) {
    var total = 0;
    return function() {
      total += x;
      return total;
    };
  };
  console.log(add); // prints the function's expression of the outer anonymous function

  // unfortunately calling add() will create another instance of the lexical environment, causes
  // the total (a local variable) to reset each time when the outer anonymous function is invoked
  console.log(add(1)); // execute the outer anonymous function, then return the function's expression of the inner anonymous function
  console.log(add(2).call()); // execute the outer anonymous function, then use call() to execute the inner anonymous function's expression
  console.log(add(3).call()); // execute the outer anonymous function, then use call() to execute the inner anonymous function's expression
});
// test.call();

test = (function() {
  var add = function() {
    var total = 0;
    return function(x) {
      total += x;
      return total;
    };
  };

  // now declare another variable assigned to the function's expression of the inner anonymous function
  let _add = add();
  // invoke the inner anonymous function using the reference to its function's expression
  // this way it won't create another lexical environment
  console.log(_add.call(null,1));
  console.log(_add(2)); // since _add is now a reference to the inner anonymous, we can also directly invoke it and pass the parameter
  console.log(_add.call(null,3));
});
// test.call();

test = (function() {
  /**
  * declare a variable add that is assigned to an anonymous function which
  * returns the result of the inner anonymous function (self-invoking)
  */
  var add = function(x) {
    var total = 0;
    total += (function() {
      return (total + x);
    })();
    return total;
  };
  // unfortunately calling add() will create another instance of the lexical environment, causes
  // the total (a local variable) to reset each time when the outer anonymous function is invoked
  console.log(add(1)); // execute the outer anonymous function, which invoke the inner anonymous function and return the result
  console.log(add(2)); // execute the outer anonymous function, which invoke the inner anonymous function and return the result
});
// test.call();

test = (function() {
  /**
  * declare a variable add that is assigned to an anonymous function's expression (self-invoking for once),
  * which then return an inner anonymous function's expression
  */
  var add = function() {
    var total = 0; // the total can be retained
    return function(x) {
      total += x;
      return total;
    };
  }();
  console.log(add); // the outer anonymous function is invoked once, then return the function's expression of the inner anonymous function
  console.log(add(1)); // execute the function's expression of the inner anonymous function, and return its exection result
  console.log(add.call(null,2)); // execute the function's expression of the inner anonymous function, and return its exection result
  console.log(add(3)); // execute the function's expression of the inner anonymous function, and return its exection result
});
// test.call();

test = (function() {
  /**
  * the most elegant solution using javascript object
  * declare a variable math that is assigned to an object, the object's add property
  * is then assigned to an anonymous function's expression
  */
  var math = {
    total: 0, // the total can be retained
    add: function(x) {
      this.total += x;
      return this.total;
    },
    minus: function(x) {
      this.total -= x;
      return this.total;
    }
  };
  console.log(math.add.call(math,1)); // execute the anonymous function's expression associated with math's add property
  console.log(math.add(2)); // execute the anonymous function's expression associated with math's add property
  console.log(math.add.call(math,3)); // execute the anonymous function's expression associated with math's add property
  console.log(math.minus(3));
  console.log(math.minus.call(math,2));
});
// test.call();

test = (function() {

  let Factory = {
    total: 0,
    create: function(initialValue) {
      this.total = initialValue;
      return this;
    },
    getTotal: function() {
      return this.total;
    }
  }

  console.log(Factory.create(999).getTotal());

});
test.call();
