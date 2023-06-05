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
function printCoord3(pt) {
    console.log("The Coordinate's x value is ".concat(pt.x));
    console.log("The Coordinate's y value is ".concat(pt.y));
}
// 인터페이스 확장하기
{
}
// 교집합(&)을 통하여 확장하기
{
}
// 기존 인터페이스에 새 필드 추가. 타입은 생성된 후에 바뀔 수 없다.
{
}
// 타입 단언 - 사용자가 타입을 좀더 구체적으로 명시할 수 있다.
// 타입은 컴파일 타임에 제거되므로, 런타임 중에 타입 검사는 이루어지지 않는다.
// 타입 단언이 틀렸더라도, 예외가 발생하거나, null 이 생성되지 않는다.
var myCanvas = document.getElementById("main_canvas");
var myCanvas2 = document.getElementById("main_canvas"); // tsx 파일이 아닐 때
// 불가능한 강제 타입 변환을 방지한다.
// const wrong = "hello" as number;
// 강제 타입 변환 - 두 번 변환하는 방법
var x = myCanvas;
// 리터럴 타입
var constantString = "Hello World"; // Hello Word 타입
// 리터럴 타입을 유니언과 함께 유용하게 사용할 수 있다.
function printText(s, alignment) { }
printText("Hello World", "left");
// printText("G'day mate", "centre");
function compare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
}
function configure(x) { }
configure({ width: 100 });
configure("auto");
// configure("automatic");
function handleRequest(url, method) { }
var req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method); // Error, method 는 string 타입으로 추론되지, "GET"|"POST" 타입으로 추론되지 않는다.
// 해결 방법
// 1. 어느 한 곳에 "GET" 으로 타입단언을 한다.
var req1 = { url: "https://example.com", method: "GET" };
// or
handleRequest(req.url, req.method);
// 2. as const 를 사용하여 객체 전체를 리터럴 타입으로 변환한다.
var req2 = { url: "https://example.com", method: "GET" }; // 객체의 모든 프로퍼티에 리터럴 타입의 값이 대입되도록 한다.
handleRequest(req2.url, req2.method);
// null, undefined
// 1. strictNullChecks 옵션이 설정돼 있지 않았을 때 - 모든 타입의 변수에 대입될 수 있다.
// 2. strictNullChecks 옵션이 설정돼 있을 때
function doSomething(x) {
    if (x === undefined) {
    }
    else {
        console.log("Hello, ".concat(x.toUpperCase()));
    }
}
// Null 아님 단언 연산자(!)
// 반드시 null, undefined 가 아닐 때만 사용해야 한다.
function liveDangerously(x) {
    console.log(x.toFixed());
}
// 열거형 - 타입 수준이 아닌, 언어와 런타임 수준에 추가되는 기능
// bigint
var oneHundred = BigInt(100);
var anotherHundred = 100n;
// symbol
var firstName = Symbol("name");
var secondname = Symbol("name");
// if (firstName === secondName) { } // 비교할 수 없다.
