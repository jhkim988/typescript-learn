"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. anonymous type
function greet(person) {
    return "Hello ".concat(person.name);
}
function greet2(person) {
    return "Hello ".concat(person.name);
}
function greet3(person) {
    return "Hello ".concat(person.name);
}
function paintShape(opts) {
    // xPos, yPos 를 사용하기 위해서는 null check 필요함.
    var xPos = opts.xPos === undefined ? 0 : opts.xPos;
    var yPos = opts.yPos === undefined ? 0 : opts.yPos;
    console.log("coordinated at: (".concat(xPos, ", ").concat(yPos, ")"));
}
var shape = {};
paintShape({ shape: shape });
paintShape({ shape: shape, xPos: 100 });
paintShape({ shape: shape, yPos: 100 });
paintShape({ shape: shape, xPos: 100, yPos: 100 });
// default value 를 이용하는 방법
function paintShape2(_a) {
    var shape = _a.shape, _b = _a.xPos, xPos = _b === void 0 ? 0 : _b, _c = _a.yPos, yPos = _c === void 0 ? 0 : _c;
    console.log("coordinated at: (".concat(xPos, ", ").concat(yPos, ")"));
}
function doSomething(obj) {
    console.log("prop has the value ".concat(obj.prop));
    // obj.prop = "Hello"; // read only
}
function visitForBirth(home) {
    console.log("Happy birthday ".concat(home.resident.name));
    home.resident.age++;
}
function evict(home) {
    // Cannot change.
    // home.resident = {
    // 	name: "Victor the Evictor",
    // 	age: 42,
    // }
}
var writablePerson = {
    name: "Person McPersonface",
    age: 42,
};
var readonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);
var myArray = { 0: "1", 1: "2" };
var secondItem = myArray[1]; // secondItem: string
var myArray2 = { 0: "0", 1: "1", 2: "2" };
function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
// let mySquare = createSquare({ colour: "red", width: 100 }); // excess property check 발생, color 의 오타를 찾아내준다.
// let mySquare = createSquare({ width: 100, opacity: 0.5 }); // Optional 인 color 는 없어도 되고, opacity 는 메서드에서 사용하지 않도록 하고 싶다면...
var mySquare = createSquare({ width: 100, opacity: 0.5 }); // as SquareConfig
var squareOptions2 = { colour: "red", width: 100 };
// excess property check 발생하지 않는다.
createSquare(squareOptions2);
// createSquare({ colour: "red", width: 100 }); // 직접 대입하면 excess property check 로 에러 발생
var squareOptions3 = { colour: "red" };
function draw(circle) {
    console.log("Color was ".concat(circle.color));
    console.log("Radius was ".concat(circle.radius));
}
draw({ color: "blue", radius: 42 });
var x = { contents: "hello world" };
// check x.contents
if (typeof x.contents === "string") {
    console.log(x.contents.toLowerCase());
}
// type assertion
console.log(x.contents.toLowerCase());
var box = { contents: "agnus dei" };
var contents = box.contents; // contents :string
// 타입 별로 오버로드 할 필요가 없다.
function setContents(box, newContents) {
    box.contents = newContents;
}
// Array type
function doSomething1(value) {
    // ...
}
var myArray1 = ["hello", "world"];
doSomething1(myArray1); // work
doSomething1(new Array("hello", "world"));
// ReadonlyArray Type
function doStuff(values) {
    var copy = values.slice();
    console.log("The first value is ".concat(values[0]));
    // values.push("hello"); // read only string[]
}
// ReadonlyArray 를 리턴 - 리턴한 배열을 수정하지 않기를 의도
// ReadonlyArray 를 인자로 받음 - 함수 내에서 배열을 수정하지 않음을 보장
// ReadonlyArray -> 직접 생성자를 통해 만들 수 없고, Array 를 ReadonlyArray 로 바꾸는 방식
// new ReadonlyArray("red", "green", "blue");
var roArray = ["red", "green", "blue"];
function doStuff1(values) {
    var copy = values.slice();
    console.log("The first value is ".concat(values[0]));
    // values.push("hello"); // read only
}
// 할당이 양방향이 아니다.
var x1 = [];
var y1 = [];
x1 = y1;
function doSomething2(pair) {
    var a = pair[0]; // a: string
    var b = pair[1]; // b: number
    console.log(a, b);
}
doSomething2(["hello", 42]);
function setCoordinate(coord) {
    var x = coord[0], y = coord[1], z = coord[2]; // x: number, y: number, z: number | undefined
    console.log("Provided coordinates had ".concat(coord.length, " dimensions")); // length: 2 | 3
}
function readButtonInput() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var name = args[0], version = args[1], input = args.slice(2); // name: string, version: number, input: boolean[]
}
function readButtonInput2(name, version) {
    var input = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        input[_i - 2] = arguments[_i];
    }
}
// Readonly Tuple
function doSomething3(pair) {
    // pair[0] = "hello"; // read only
}
var point = [3, 4];
function distanceFromOrigin(_a) {
    var x = _a[0], y = _a[1];
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
