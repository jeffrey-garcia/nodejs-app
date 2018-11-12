(function() {

  const ADD_ACTION = {
    type: "ADD",
    payload: 1
  }
  console.log(ADD_ACTION);

  let { type, payload } = ADD_ACTION;
  console.log(type);
  console.log(payload);

})();
