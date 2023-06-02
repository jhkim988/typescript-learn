// 원시타입: string, number, boolean
// typeof 연산 시 결과값과 같다.
// number 에 int float double 등은 없다.
let strVal: string = "Hello, World!";
console.log(strVal, typeof strVal);

// 배열
// Array<number>: 제네릭
let arrNumbers: number[] = [1, 2, 3];

// any
// 추가적인 타입검사 비활성화 됨
let obj: any = { x: 0 };
obj = "hello";
const n: number = obj;

// 타입 추론
let myName = "Alice"; // let myName: string = "Alice";

// 함수 - 반환값도 타입추론이 된다.
function greetTo(name: string): void {
  console.log(`Hello, ${name.toUpperCase()}!!`);
}
greetTo("42");

const names = ["Alice", "Bob", "Eve"]; // 타입 추론 - string[]
names.forEach(function (s) {
  // 타입 추론 - s: string
  console.log(s.toLocaleLowerCase());
});
names.forEach((s) => {
  // 타입 추론 - s: string
  console.log(s.toLocaleLowerCase());
});

// 객체 타입
function printCoord(pt: { x: number; y: number }) {
  // 타입에 ; 또는 , 를 사용할 수 있다. 지정하지 않으면 any 타입이 된다.
  console.log(`TheCoordinate's x value is ${pt.x}`);
  console.log(`TheCoordinate's y value is ${pt.y}`);
}
printCoord({ x: 3, y: 7 });

// 옵셔널 프로퍼티 - ?: 로 지정한다.
function printName(obj: { first: string; last?: string }) {
  console.log(`first: ${obj.first.toLocaleLowerCase()}`);
  if (obj.last !== undefined) {
    console.log(`last: ${obj.last.toLocaleLowerCase()}`); // undefined 인지 체크해야 한다.
  }
  console.log(`last: ${obj.last?.toLocaleLowerCase()}`); // 혹은 ?. 를 사용한다.
}
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// 유니언 타입 - 조합에 사용된 타입 중 하나를 타입으로 가질 수 있다.
function printId(id: number | string) {
  console.log(`Your ID is : ${id}`);

  // toLocaleLowerCase() 메서드를 사용하기 위해서는 분기처리가 필요하다..
  if (typeof id === "string") {
    console.log(id.toLocaleLowerCase());
  } else {
    console.log(id);
  }
}
printId(101);
printId("202");
// printId({ myId: 234 }); // error!

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log(`Hello, ${x.join(" and ")}`);
  } else {
    console.log(`Welcome lone traveler ${x}`);
  }
}

// 공통된 메서드를 가진다면 분기처리 하지 않아도 된다.
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

// 타입 alias
type Point = {
  x: number;
  y: number;
};
function printCoord2(pt: Point) {
  console.log(`(${(pt.x, pt.y)})`);
}
printCoord2({ x: 100, y: 200 });

type ID = number | string; // 객체 타입뿐만 아니라, 모든 타입에 대해서 새로운 이름을 부여할 수 있다.

// 타입 별칭을 사용해도, 구별되는 "여러 버전"을 만드는 게 아니다. (별칭이지 새로운 타입을 만드는 게 아님)
type UserInputSanitizedString = string;
function sanitizeInput(str: string): UserInputSanitizedString {
  return str;
}
let userInput = sanitizeInput("input");
userInput = "new input";


// 인터페이스

