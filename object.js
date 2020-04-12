// enforce use strict globally
'use strict';

const testCase1 = () => {
    var obj1 = {}; // create an empty object
    var obj2 = Object.create(null); // create an object with null as prototype
    var obj3 = Object.create(Object.prototype); // create an object with object as prototype
    var obj4 = new Object(); // using the new keyword

    console.log(obj1); // should be {}
    console.log(obj2); // should be {}
    console.log(obj3); // should be {}
    console.log(obj4); // should be {}

};
// testCase1();

const testCase2 = () => {
    let objectMap = {};

    objectMap.key1 = { value: 'value1' };
    objectMap.key2 = { value: 'value2' };

    console.log(`${JSON.stringify(objectMap)}`);
    console.log(objectMap.hasOwnProperty('key1')); // should be true
    console.log(objectMap['key1'] != null); // should be true
    console.log(objectMap['key1']); // should be { value: 'value1' }
};
// testCase2();

const PremiumLevel = {
    GOLD: 'GOLD',
    PLATINUM: 'PLATINUM',
    DIAMOND: 'DIAMOND' 
};

function Customer() {
    var id = '';
    var age = 0;
    var name = '';
    console.log(`invoking constructor of: ${Customer.prototype.constructor.name}`);
};

const testCase3 = () => {
    console.log(`${typeof Customer}`); // should be function
    console.log(`${typeof Customer.prototype}`); // should be object
    console.log(`${typeof Customer.prototype.constructor}`); // should be function
    console.log(`${Customer.prototype.constructor.name}`); // should be Customer
};
// testCase3();

function PremiumCustomer() {
    console.log(`invoking constructor of: ${PremiumCustomer.prototype.constructor.name}`);
    // invoke super constructor
    Customer.call(this);
    this.level = PremiumLevel.GOLD; // default to GOLD level
};
// subclass extends superclass
PremiumCustomer.prototype = Object.create(Customer.prototype);
// override super class constructor
PremiumCustomer.prototype.constructor = PremiumCustomer;

const testCase4 = () => {
    let customer = new PremiumCustomer();
    customer.id = '1';
    customer.age = 30;
    customer.name = 'John Doe';

    console.log(`${typeof customer}`); // should be object
    console.log(`${JSON.stringify(customer)}`); // should be {"level":"GOLD","id":"1","age":30,"name":"John Doe"}
    console.log(`${customer instanceof Customer}`); // should be true
    console.log(`${customer instanceof PremiumCustomer}`); // should be true
};
// testCase4();

function PlatinumCustomer() {
    console.log(`invoking constructor of: ${PlatinumCustomer.prototype.constructor.name}`);
    PremiumCustomer.call(this);
    this.level = PremiumLevel.PLATINUM; // set level to PLATINUM
};
PlatinumCustomer.prototype = Object.create(PremiumCustomer.prototype);
PlatinumCustomer.prototype.constructor = PlatinumCustomer;
PlatinumCustomer.prototype.doPlatinumStuff = () => {
    console.log(`executing ${typeof PlatinumCustomer.prototype.doPlatinumStuff} - doPlatinumStuff()`);
};

const testCase5 = () => {
    let customer = new PlatinumCustomer();
    customer.id = '1';
    customer.age = 30;
    customer.name = 'John Doe';
    
    console.log(`${typeof customer}`); // should be object
    console.log(`${typeof customer.doPlatinumStuff()}`); // should be function
    console.log(`${customer.constructor.name}`); // should be PlatinumCustomer
    console.log(`${JSON.stringify(customer)}`); // should be {"level":"PLATINUM","id":"1","age":30,"name":"John Doe"}
    console.log(`${customer instanceof Customer}`); // should be true
    console.log(`${customer instanceof PremiumCustomer}`); // should be true
    console.log(`${customer instanceof PlatinumCustomer}`); // should be true
};
// testCase5();

class A {
    constructor() {
        console.log(`invoking constructor of ${A.prototype.constructor.name}`);
        this.id = '';
        this.age = 0;
        this.name = '';
    }
}

class B extends A {
    constructor() {
        console.log(`invoking constructor of ${B.prototype.constructor.name}`);
        super();
        this.id = '';
        this.age = 0;
        this.name = '';
        this.job = {
            title: '',
            workYear: 0,
            company: ''
        };
    }
}

const testCase6 = () => {
    let objA = new A();
    console.log(objA instanceof A); // should be true

    let objB = new B();
    objB.id = '2';
    objB.age = 30;
    objB.name = 'John Doe';
    objB.job = { title:'Sales Manager', workYear:10, company:'ABC' }
    console.log(JSON.stringify(objB)); // should be {"id":"2","age":30,"name":"John Doe","job":{"title":"Sales Manager","workYear":10,"company":"ABC"}}
    console.log(objB instanceof A); // should be true
    console.log(objB instanceof B); // should be true
    console.log(A.prototype.isPrototypeOf(objB)); // should be true
    console.log(objB.constructor.name); // should be B

    let objC = Object.create(objB); // create a new object from another object, attributes are NOT copied!!!
    console.log(JSON.stringify(objC)); // should be {}
    console.log(objC instanceof A); // should be true
    console.log(objC instanceof B); // should be true
    console.log(A.prototype.isPrototypeOf(objC)); // should be true
    console.log(A.prototype.isPrototypeOf(objC)); // should be true
    console.log(objC.constructor.name); // should be B

    let objD = Object.assign(objB); // create a new object by deep cloning another object
    console.log(JSON.stringify(objD)); // {"id":"2","age":30,"name":"John Doe","job":{"title":"Sales Manager","workYear":10,"company":"ABC"}}
    console.log(objD instanceof A); // should be true
    console.log(objD instanceof B); // should be true
    console.log(A.prototype.isPrototypeOf(objD)); // should be true
    console.log(B.prototype.isPrototypeOf(objD)); // should be true
    console.log(objD.constructor.name); // should be B
};
testCase6();