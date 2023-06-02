// 원시타입: string, number, boolean
// typeof 연산 시 결과값과 같다.
// number 에 int float double 등은 없다.
var strVal = "Hello, World!";
console.log(strVal, typeof strVal);
// 배열
// Array<number>: 제네릭
var arrNumbers = [1, 2, 3];
// any
// 추가적인 타입검사 비활성화 됨
var obj = { x: 0 };
obj = "hello";
var n = obj;
// 타입 추론
var myName = "Alice"; // let myName: string = "Alice";
// 함수 - 반환값도 타입추론이 된다.
function greetTo(name) {
    console.log("Hello, ".concat(name.toUpperCase(), "!!"));
}
greetTo("42");
var names = ["Alice", "Bob", "Eve"]; // 타입 추론 - string[]
names.forEach(function (s) {
    // 타입 추론 - s: string
    console.log(s.toLocaleLowerCase());
});
names.forEach(function (s) {
    // 타입 추론 - s: string
    console.log(s.toLocaleLowerCase());
});
// 객체 타입
function printCoord(pt) {
    // 타입에 ; 또는 , 를 사용할 수 있다. 지정하지 않으면 any 타입이 된다.
    console.log("TheCoordinate's x value is ".concat(pt.x));
    console.log("TheCoordinate's y value is ".concat(pt.y));
}
printCoord({ x: 3, y: 7 });
// 옵셔널 프로퍼티 - ?: 로 지정한다.
function printName(obj) {
    var _a;
    console.log("first: ".concat(obj.first.toLocaleLowerCase()));
    if (obj.last !== undefined) {
        console.log("last: ".concat(obj.last.toLocaleLowerCase())); // undefined 인지 체크해야 한다.
    }
    console.log("last: ".concat((_a = obj.last) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase())); // 혹은 ?. 를 사용한다.
}
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
// 유니언 타입 - 조합에 사용된 타입 중 하나를 타입으로 가질 수 있다.
function printId(id) {
    console.log("Your ID is : ".concat(id));
    // toLocaleLowerCase() 메서드를 사용하기 위해서는 분기처리가 필요하다..
    if (typeof id === "string") {
        console.log(id.toLocaleLowerCase());
    }
    else {
        console.log(id);
    }
}
printId(101);
printId("202");
// printId({ myId: 234 }); // error!
function welcomePeople(x) {
    if (Array.isArray(x)) {
        console.log("Hello, ".concat(x.join(" and ")));
    }
    else {
        console.log("Welcome lone traveler ".concat(x));
    }
}
// 공통된 메서드를 가진다면 분기처리 하지 않아도 된다.
function getFirstThree(x) {
    return x.slice(0, 3);
}
function printCoord2(pt) {
    console.log("(".concat((pt.x, pt.y), ")"));
}
printCoord2({ x: 100, y: 200 });
function sanitizeInput(str) {
    return str;
}
var userInput = sanitizeInput("input");
userInput = "new input";
// 인터페이스
