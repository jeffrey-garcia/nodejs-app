// enforce use strict globally
'use strict';

let test;

test= (function () {
  var isoDate = new Date().toISOString();
  console.log(isoDate);
  console.log(typeof(isoDate));
  
  var _date = new Date(isoDate);
  console.log(_date);
  console.log(typeof(_date) == "object" ? _date.constructor.name:typeof(_date));
})
test.call();

test = (function () {
  var isoDate = new Date().toISOString();
  console.log(isoDate);

  var utcDate = new Date().toUTCString();
  console.log(utcDate);

  var timezoneOffset = new Date().getTimezoneOffset() / 60; // time zone offset in hours
  console.log(timezoneOffset); // negative means behind UTC, so is inverted

  var _date = new Date(isoDate);
  console.log(_date.toISOString());
  console.log(_date.getDate());
  console.log(_date.getHours());
  console.log(_date.getDate());
  console.log(_date.getMinutes());
  console.log(_date.getSeconds());
  console.log(_date.getMilliseconds());

});
// test.call();

test = (function () {
  let utcStartDateTime = new Date("2018-11-16T03:10:44.213Z"); // UTC start time
  let utcSystemDateTime = new Date(new Date().toISOString()); // local system current time
  console.log(utcStartDateTime.getTime());
  console.log(utcSystemDateTime.getTime());

  let secondDiff = (utcSystemDateTime.getTime() - utcStartDateTime.getTime()) / 1000;
  console.log(`second diff: ${secondDiff}`);

  let minuteDiff = (utcSystemDateTime.getTime() - utcStartDateTime.getTime()) / (1000 * 60);
  console.log(`minute diff: ${minuteDiff}`);

  const minuteTimeout = 15;

  if (minuteDiff>0) {
    if (minuteDiff<minuteTimeout) {
      console.log("elapsed minute: " + minuteDiff);
      console.log("remaining minute: " + (minuteTimeout - Math.round(minuteDiff)));
    } else {
      console.log("expired already");
    }
  } else {
    console.log("start time in future, not started");
  }
});
// test.call();

test = (function () {
  let v1 = 1542337844213
  let v2 = 1542953202151

  let result1 = (v2/1000 - v1/1000);
  console.log(result1);
  console.log(Math.round(result1));

  let result2 = (v2 - v1)/1000;
  console.log(result2);
  console.log(Math.round(result2));

  let result3 = (v2/(1000*60)) - (v1/(1000*60));
  console.log(result3);
  console.log(Math.round(result3));

  let result4 = (v2 - v1)/(1000*60);
  console.log(result4);
  console.log(Math.round(result4));

});
// test.call();
