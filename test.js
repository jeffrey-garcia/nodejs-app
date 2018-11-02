// test('testing', test1 => {
//   test1.test('test1', assert => {
//     const actual = [1,2,3];
//     const expected = [1,2,3];
//
//     assert.deepEqual(actual, expected, "should be same");
//     assert.end();
//   });
// });

// enforce use strict globally
'use strict';

const assert = require('assert');
const expect = require('chai').expect;

describe('test1', function () {
  beforeEach(function() {
    //
  });

  it('test1', function () {
    const actual = "abc";
    const expected = "abc";

    // ASSERT
    expect(actual).to.be.equal(expected);
  });
});

describe('test2', function () {
  beforeEach(function() {
    //
  });
  
  it('test2', function () {
    const actual = [1,2,3];
    const expected = [1,2,3];

    // ASSERT
    assert.deepEqual(actual, expected, "should be same");
  });
});
