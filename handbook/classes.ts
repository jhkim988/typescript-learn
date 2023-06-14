class Point {
  x: number;
  y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

console.log(`${pt.x}, ${pt.y}`);

// pt.x = "0"; // type error

// tsconfig.json 에서 컴파일 옵션 --strictPropertyInitialization
// -> 생성자에서 필드 초기화 해야한다.
class BadGreeter {
  name: string;
  birth!: Date; // << assertion operator(!) 를 사용하면, 초기화 하지 않아도 에러가 발생하지 않는다. 외부에서 초기화하는 경우 등에서 사용
  constructor() {
    this.name = "hello";
  }
}

// readonly
class Greeter {
  readonly name: string = "word";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  err() {
    // this.name = "not ok"; // ERROR
  }
}

const g = new Greeter();
// g.name = "also not ok"; // ERROR

// constructor
class Point1 {
  x: number;
  y: number;

  // type annotation, overload, default value 가능
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any, x: number = 0) {}
}

// Super Call
class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    // console.log(this.k); // this 접근 전에 super() 를 호출해야 한다.
    super();
  }
}

// Method
class Point2 {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n; // this 붙이지 않으면 class 외부 변수 참조됨
    this.y *= n;
  }
}

// Getter/Setter
// TS 기능이 아닌, JS 원래 기능
// get 만 있고 set 이 없다면 해당 프로퍼티는 자동으로 readonly 가 된다.
// setter 의 parameter 타입을 명시하지 않으면, getter 의 반환타입으로 타입추론됨.
// getter/setter 는 같은 접근지시자를 가져야 한다.
class C {
  _length = 0;

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }
}

// ts 4.3부터 getter/setter 에 다영한 타입으로 접근 가능
class Thing {
  _size = 0;
  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
    this._size = num;
  }
}

// Index Signatures
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

// Class Heritage
interface Pingable {
  ping(): void;
}

// 인터페이스
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  // Not Error
  // check(s) { // s: any, string 으로 타입 추론 안된다.
  //   return : s.toLowercase() === "ok"; // Lower"C"ase
  // }
  check(s: string) {
    return s.toLowerCase() === "ok";
  }
}

interface A {
  x: number;
  y?: number; // Optional Property 는 생성하지 않는다.
}

class C1 implements A {
  x = 0;
}

const c1 = new C1();
// c1.y = 10; // does not exist

class Animal {
  move() {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const d = new Dog();
d.move();
d.woof(10);

class Base1 {
  greet() {
    console.log("Hello, World!");
  }
}

class Derived1 extends Base1 {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d1 = new Derived1();
d1.greet();
d1.greet("reader");

const b: Base1 = d1;
b.greet();

class Derived2 extends Base1 {
  // greet(name: string) { // Error
  // console.log(`Hello, ${name.toUpperCase()}`);
  // }
}

// Type
interface Animal {
  dateOfBirth: any;
}

interface Dog extends Animal {
  breed: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}

// initialization Order
class Base2 {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}

class Derived3 extends Base2 {
  name = "derived";
}

new Derived3(); // My name is base

// 1. Base 클래스 필드 초기화
// 2. Base constructor 실행
// 3. Derived 클래스 필드 초기화
// 4. Derived constructor 실행

// Ingeriting Built-in Types
// Error, Array, Map 등을 상속 -> new.target 을 이용하여 prototype chain 을 조종한다. -> 권장하지 않음
class MsgError extends Error {
  constructor(m: string) {
    super(m);
    // Object.setPrototypeOf(this, MsgError.prototype); // super 호출 이후에 prototype 을 즉시 조정해주면 된다.
    // MsgError 의 하위 타입도 수동으로 설정해야 한다. __proto__ 를 사용하는 방법도 있다.
    // IE 10 이하 버전에서는 동작하지 않는다.
  }

  sayHello() {
    return `hello ${this.message}`;
  }
}

const msgError = new MsgError("jh");

// msgError.sayHello(); // sayHello() is not a function;
console.log(msgError instanceof MsgError); // false, instanceof 가 깨졌다.

// Member visibility
// public(default): 어느 곳에서나 접근 가능
// protected: 서브클래스에서만 접근 가능 -> 메서드 호출이 클래스 내부여야 함
class Greeter1 {
  public greet() {
    console.log(`Hello, ${this.getName()}`);
  }

  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter1 {
  public howdy() {
    console.log(`Howdy, ${this.getName()}`); // 호출 가능
  }
}

const g1 = new SpecialGreeter();
g1.greet();
g1.howdy();
// g1.getName(); // 서브클래스 내부가 아님

// 상속 계층에서의 protected access
class Base3 {
  protected x: number = 1;
}

class Derived4 extends Base {
  protected x: number = 5;
}

class Derived5 extends Base3 {
  f1(other: Derived5) {
    other.x = 10;
  }
  f2(other: Base3) {
    // Java 에서는 가능, C#/C++/TS 에서는 불가능
    // other.x = 10;
  }
}

// private: 해당 클래스 외에서는 접근 불가능
// cross-instance private access: 같은 타입의 다른 instance 라면 접근 가능
class A1 {
  private x = 10;

  public sameAs(other: A1) {
    return this.x === other.x; // other.x, 다른 인스턴스이지만 같은 타입이므로 접근 가능
  }
}

// private/protected 는 type checking 시에만 접근제한 한다.
class MySafe {
  private secretKey = 12345;
}

const s = new MySafe();
// console.log(s.secretKey); // in JS file...
console.log(s["secretKey"]);

// JS 의 private field 는 위의 상황이 발생하지 않는다. (변수명 앞에 # 붙여서 private)
// TS 컴파일을 ES2021 이하로 하면 TS 는 #대신 WeekMap 을 이용한다.

// Static Member -> public protected, private

// Special Static Names:
// class 는 new 키워드를 사용하는 Function 이기 때문에 function prototype 변수를 overrite 할 수 없다.
// name, length, call 등을 static 변수명으로 할 수 없다.

// static class 는 없다.
// Java, C# 등은 모든 구조가 클래스 내에 있도록 강제하지만, TS 는 그렇지 않기 때문에 static class가 필요하지 않다.

// static block -> 초기화 코드 작성 가능

// Generic classes
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b1 = new Box("hello!"); // Box<string> 으로 타입 추론 된다.

// 타입 변수를 static 변수로 쓸 수 없다.

// this keyword
class MyClass1 {
  name = "MyClass";
  getName() {
    return this.name;
  }
}

const c = new MyClass1();
const obj = {
  name: "obj",
  getName: c.getName,
};

console.log(obj.getName()); // obj
// this 는 함수가 어떻게 호출됐는지에 의존한다. (obj 를 통하여 호출됐다면 this 는 obj)

// arrow functions
class MyClass2 {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}

const c2 = new MyClass2();
const g2 = c2.getName;
console.log(g2()); // MyClass

// trace-off
// 1. this 값은 타입스크립트가 체크하지 않은 코드에 대해서도 런타임에 정확한 값을 보장한다.
// 2. class 메서드 대신 arrow function을 사용하면 더 많은 메모리를 사용한다. (인스턴스마다 arraow function 을 할당하므로.)
// 3. super.getName 을 자식클래스에서 사용할 수 없다. prototype chain 의 항목에 없기 때문

// this parameter
// ts 에서 메서드/함수의 this 라는 이름의 첫 번째 인자는 특별한 의미를 갖는다.
// this 인자로 올바른 context 인지 확인한다.

// In TS
type SomeType = {};
function fn(this: SomeType, x: number) {
  /* ... */
}

// -> Compile... In JS
// function fn(x: number) { }

class MyClass3 {
  name = "MyClass";
  getName(this: MyClass3) {
    return this.name;
  }
}

const c3 = new MyClass3();
c3.getName(); // this: MyClass3, OK

const g3 = c3.getName;
// g3(); // this: window, NO

// trade-off
// 1. JS 쪽에서 호출하면 여전히 this context 가 명확하지 않다.
// 2. 인스턴스 당 하나가 아니라 클래스 당 하나의 함수만 할당된다.
// 3. 부모 클래스는 여전히 super 를 통해 호출된다.

// this Types
class Box1 {
  contents: string = "";

  // set(value: string): this, 리턴 타입을 Box 가 아닌 this 로 추론한다.
  set(value: string) {
    this.contents = value;
    return this;
  }

  // parameter type annotation 을 this 로 설정할 수도 있다.
  sameAs(other: this) {
    return other.contents === this.contents;
  }
}

class ClearableBox extends Box1 {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const b2 = a.set("hello"); // set(value: string): ClearableBox, 동적으로 리턴타입이 바뀐다.

// this - based type guard
// return 타입에서 [this is Type] 을 사용할 수 있다.

// parameter property
// 생성자에서 public, protected, private, readonly 등을 설정할 수 있다.

// 클래스 표현식, 추상클래스 가능

abstract class Abs {
  abstract printName(): string;
}

// Abs 의 구현체의 생성자를 받아 함수 내에서 인스턴스를 만들고 싶다면...
function greet(ctor: typeof Abs) {
  // const instance = new ctor();
}

function greet1(ctor: new () => Abs) {
  const instance = new ctor();
  instance.printName();
}

class Derived6 extends Abs {
  printName(): string {
    return `printName call`;
  }
}

greet1(Derived6);
// greet1(Abs); Error

// 클래스 간의 관계
class Point3 {
  x = 0;
  y = 0;
}

class Point4 {
  x = 0;
  y = 0;
}

const p: Point1 = new Point2(); // OK, 내부 구조만 같으면 된다.

class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

const p2: Person = new Employee(); // OK, Person 의 모든 property 가 있다.
// const p3: Employee = new Person(); // Error, salary 가 없다.

class Empty {}
function f(x: Empty) {}
f(window);
f({});
f(f);

export {};
