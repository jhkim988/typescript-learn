// 타입 축소
function padLeft(padding: number | string, input: string) {
  // padding: number | string
  if (typeof padding === "number") {
    // padding: number
    return " ".repeat(padding) + input;
  }
  //padding: string
  return padding + input;
}

// 타입 가드
// typeof 리턴 값
// string, number, bigint, boolean, symbol, undefined, object, function
console.log("typeof null: ", typeof null);
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    // for (const s of strs) { } // strs 는 null 일 수 있다. typeof null 은 object 다.
  }
}

// true/false 축소
// 아래 값들은 false 이고, 그외의 값들은 true 이다.
// 0 NaN, "", 0n,null, undefined
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    // strs 가 null 인 경우 제거
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

function printAll3(strs: string | string[] | null) {
  // strs 가 빈 문자열인 경우, 분기처리가 이전과 다르게 된다.
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) console.log(s);
    } else {
      console.log(strs);
    }
  }
}

function multiplyAll(values: number[] | undefined, factor: number) {
  if (!values) {
    return values; // undefined
  } else {
    return values.map((x) => x * factor);
  }
}

// equality 축소
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // x === y 이므로, 공통유형인 string
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x); // x: string | number
    console.log(y); // y: string | boolean
  }
}

function printAll4(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      // strs: string[]
      for (const s of strs) console.log(strs);
    }
  } else if (typeof strs === "string") {
    /// strs: string
    console.log(strs);
  }
}

// in 축소
type Fish = { name: string; swim: () => void };
type Bird = { name: String; fly: () => void };
function move(animal: Fish | Bird) {
  // Fish, Bird 중 swim 이 있는 것은 Fish 뿐이기 때문에
  if ("swim" in animal) {
    return animal.swim(); // animal: Fish
  }
  return animal.fly(); // animal: Bird
}

type Human = { swim?: () => void; fly?: () => {} };
function move2(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // Fish | Human
  } else {
    animal; // Bird | Human
  }
}

// instanceof 축소
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // x: Date
    console.log(x.toUTCString());
  } else {
    // x: string
    console.log(x.toUpperCase());
  }
}

// 할당
let x1 = Math.random() < 0.5 ? 10 : "hello word!"; // x1: number | string
x1 = 1; // x1: number | string
console.log(x1); // x1: number

x1 = "goodbye"; // x1: number | string
console.log(x1); // x1: string

// 흐름 제어
function example2() {
  let x: string | number | boolean;
  x = Math.random() < 0.5;
  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
  } else {
    x = 100;
    console.log(x);
  }

  return x; // x: string | number
}

// type predicate
// 리턴 타입을 [parameterName is type] 형식으로 한다.
// parameterName은 함수 시그니처의 매개변수 이름이어야 한다.
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
function getSmallPet(): Fish | Bird {
  if (Math.random() < 0.5)
    return { name: `fish${Math.floor(Math.random() * 10)}`, swim: () => {} };
  return { name: `bird${Math.floor(Math.random() * 10)}`, fly: () => {} };
}
let pet = getSmallPet();
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
// this is type (클래스에서)

// Discriminated unions
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
function handleShape(shape: Shape) {
  // if (shape.kind === "rect") { } // wrong
}

function getArea(shape: Shape) {
  // return Math.PI * shape.radius ** 2; // shape 는 undefined 일 수 있다.
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2; // 단언 연산자 !, 그러나 circle 이지만 radius 가 없을 수도 있다. (어떤 실수 등으로...)
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape2 = Circle | Square;
function getArea2(shape: Shape2) {
  // return Math.PI * shape.radius ** 2; // Shape 가 Circle 이 아니라면?
}
function getArea3(shape: Shape2) {
  if (shape.kind === "circle") {
    // shape.kind 조건으로 타입을 Circle 로 추론해줬다. 따라서 radius 는 undefined 가 아니고, 오류가 발생하지 않는다.
    return Math.PI * shape.radius ** 2;
  }
}
function getArea4(shape: Shape2) {
	switch (shape.kind) {
    case "circle":
			// shape: Circle
      return Math.PI * shape.radius ** 2; // 이 문장을 제거하면, 아래의 리턴에 두 가지 case 가 들어가므로 타입 에러가 발생한다. (타입추론이 Square 에서 Shape로 바뀜)
    case "square":
			// shape: Square
      return shape.sideLength ** 2;
  }
}


// never type
function getArea5(shape: Shape2) {
	switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
		default:
			const _exhaustiveCheck: never = shape;
			return _exhaustiveCheck;
  }
}
// Shape2 타입에 circle, squre 외에 다른 타입이 추가된다면 default 에서는 타입 에러가 발생한다.