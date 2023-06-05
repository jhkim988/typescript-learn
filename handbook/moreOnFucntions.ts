// Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn("Hello, World!");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// type alias
type GreetFunction = (a: string) => void;

function greeter1(fn: GreetFunction) {
  fn("Hello, World!");
}

// Call Signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(`${fn.description} returned ${fn(6)}`);
}

function myFunc(someArg: number) {
  return someArg > 3;
}

myFunc.description = "default description";
doSomething(myFunc);

// Construct Signatures
class SomeObject {}

type SomeConstructor = {
  new (s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

// Date(10) or new Date()
interface CallOrconstruct {
  new (s: string): Date;
  (n?: number): string;
}

// Generic Function
function firstElement(arr: any[]) {
  return arr[0];
}

function firstElement1<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

const s = firstElement(["a", "b", "c"]); // s: any
const s1 = firstElement1(["a", "b", "c"]); // s1: string | undefined

// 타입 추론
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n)); // 콜백함수의 타입을 넣어주지 않아도 추론이 된다.

// 제약
// {length: number} 를 상속한 객체를 Generic Type 으로 설정
// 즉, length property 가 있는 객체
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

const longerArray = longest([1, 2], [1, 2, 3]); // number[]
const longerString = longest("alice", "bob"); // "alice" | "bob"
// const notOK = longest(10, 100); // length property 가 없다.

// Generic 사용 시 유의해야할 점
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // 에러 원인:
    // Signature 를 살펴보면, input 의 Type 타입과 같은 타입을 리턴하도록 돼 있다.
    // { length: minimum } 은 첫 번째 인자로 들어온 obj 와 같은 타입이라고 볼 수 없다.
    // return { length: minimum };

    return obj;
  }
}

// Type 지정
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// const arr = combine([1, 2, 3], ["hello"]); // 같은 타입이 아니기 때문에 에러
const arr = combine<number | string>([1, 2, 3], ["hello"]); // 타입을 다음과 같이 지정하면 에러가 나지 않는다.

// 좋은 제네릭 함수를 작성하는 방법
// 너무 많은 타입 매개변수, 필요하지 않는 제약을 사용하면 추론 성공률이 떨어진다.

// 1. 제네릭 타입을 최대한 매개변수로 "내려"서 구체적인 타입을 유지하라.
// 비교 (1) - 반환 리턴 타입이 Type 이다.
function firstElement2<Type>(arr: Type[]) {
  return arr[0];
}

// 비교 (2) - 반환 리턴 타입이 any 이다.
function firstElement3<Type extends any[]>(arr: Type) {
  return arr[0];
}

// 가능하다면 Type parameter 에 제약조건을 사용하지 말고 그대로 사용하는 것이 좋다.

// 2. 가능한 적은 Type Parameter 사용
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
) {
  return arr.filter(func);
}

// 3. Type Parameter 는 두 번 등장해야 한다. - 필요하지 않은 제네릭 타입인지 고려한다.
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
greet("world");

// Optional Parameters
// ? 를 이용하여 Optional 을 표현한다.
function f(x?: number) {
  console.log(x); // x: number | undefined
}
f();
f(10);

// default value
function f1(x = 10) {
  console.log(x); // x: number
}

// declare function f2(x?: number): void;
// f2();
// f2(10);
// f2(undefined);

// 콜백함수에서 Optional parameter
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// Function Overloads
// signature 를 여러 개 작성하여 구현한다.
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  // 구현 서명을 호출할 수 없다. 위에 두 개만 호출 가능
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);

// 구현 서명은 오버로드 서명과 호환돼야 한다.
// function fn1(x: boolean): void;
// function fn1(x: string): void;
// function fn1(x: boolean) { }

// 좋은 오버로드 작성 방법
// - 오버로드 보다 타입 유니언이 더 낫다.
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
len(""); // OK
len([0]); // OK
// len(Math.random() > 0.5 ? "hello" : [0]); // string | any[] 타입에 대해서 호출하지 못한다.

// 더 괜찮은 버전
function len1(x: any[] | string) {
  return x.length;
}

// 함수 안에서 this
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

class User {}
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
const db = { filterUsers: (filter: (this: User) => boolean) => [] };
const admins = db.filterUsers(function (this: User) {
  return true;
});
// const admins2 = db.filtersUsers((this: User) => true); // not arrow function

// void 와 undefined 는 다르다.
function noop() {
  return;
}
noop(); // void

// object 와 Object 는 다르다. 항상 object 를 사용한다.

// unknown
// any 타입과 비슷하지만, 더 안전하다. unknown 의 프로퍼티를 참조해서 사용할 수 없기 때문
// 함수 body 에서 사용하지 않는 값을 선언부에 넣을 수 있다.
function f3(a: any) {
  a.b(); // ???
}

function f4(a: unknown) {
  // a.b(); // X
}

// 리턴값을 unknown 으로 할 수도 있다.
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
const obj = safeParse("123123");

// never
// 값을 리턴하지 않는 함수
function fail(msg: string): never {
  throw new Error(msg);
}

function fn1(x: string | number) {
  if (typeof x === "string") {
  } else if (typeof x === "number") {
  } else {
    x; // x: never
  }
}

// Function - 호출할 수 있으며 리턴 타입은 any 이다.
function doSomething1(f: Function) {
  return f(1, 2, 3);
}
// 임의의 함수를 인자로 받고 싶다면 () => void 를 사용하는 게 더 안전하다.

// Rest Parameters/Arguments
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
const a = multiply(10, 1, 2, 3, 4);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// TypeScript 는 배열이 불변이라고 가정하지 않는다.
// atan2 는 인자를 2개로 받는데, args 가 변경돼 여러 개의 값을 가질 수 있다.
// 따라서 as const 를 붙여서 해결한다.
const args = [8, 5] as const;
const angle = Math.atan2(...args);

// 구조 분해 - type alias 이용해도 된다.
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

// 기능 할당
// 반환 유형 void
// 리턴타입 void는 함수가 아무것도 반환하지 않도록 강제하지 않는다. (즉, 값 반환을 허용한다.)
type voidFunc = () => void;

const f5: voidFunc = () => {
  return true;
};

const f6: voidFunc = () => true;

const f7: voidFunc = function () {
  return true;
};

// void 타입
const v1 = f5();
const v2 = f6();
const v3 = f7();
console.log(v1, v2, v3); // 출력은 리턴값(true) 가 나오는 것을 확인할 수 있다.

//// @ts-expect-error 를 사용해서 voidFunc 없이 void 리턴 타입에서 다른 값을 리턴할 수 있다.
function f8(): void {
  // @ts-expect-error
  return true;
}
