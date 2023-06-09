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
	check(s) {
		return s.toLowercase() === "ok";
	}
}

export {};
