// enforce use strict globally
'use strict';

var test1 = (function() {
  /**
  * declare a variable add that is assigned to an anonymous function's expression which
  * returns an inner anonymous function's expression
  */
  var add = function(x) {
    var total = 0; // unfortunately total (a local variable) is reset each time when add is invoked
    return function() {
      total += x
      return total;
    };
  };
  console.log(add); // prints the function's expression of the outer anonymous function
  console.log(add(1)); // execute the outer anonymous function, then return the function's expression of the inner anonymous function
  console.log(add(2).call()); // execute the outer anonymous function, then use call() to execute the inner anonymous function's expression
  console.log(add(3).call()); // execute the outer anonymous function, then use call() to execute the inner anonymous function's expression
});
test1.call();

var test2 = (function() {
  /**
  * declare a variable add that is assigned to an anonymous function which
  * returns the result of the inner anonymous function (self-invoking)
  */
  var add = function(x) {
    var total = 0; // unfortunately total (a local variable) is reset each time when add is invoked
    total += (function() {
      return (total + x);
    })();
    return total;
  };
  console.log(add(1)); // execute the outer anonymous function, which invoke the inner anonymous function and return the result
  console.log(add(2)); // execute the outer anonymous function, which invoke the inner anonymous function and return the result
});
// test2.call();

var test3 = (function() {
  /**
  * [closures]
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
// test3.call();

var test4 = (function() {
  /**
  * declare a variable math that is assigned to an object, the object's add property
  * is then assigned to an anonymous function's expression
  */
  var math = {
    total: 0, // the total can be retained
    add: function(x) {
      this.total += x;
      return this.total;
    }
  };
  console.log(math.add.call(math,1)); // execute the anonymous function's expression associated with math's add property
  console.log(math.add.call(math,2)); // execute the anonymous function's expression associated with math's add property
  console.log(math.add.call(math,3)); // execute the anonymous function's expression associated with math's add property
});
// test4.call();
