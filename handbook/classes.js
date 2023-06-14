"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
var pt = new Point();
pt.x = 0;
pt.y = 0;
console.log("".concat(pt.x, ", ").concat(pt.y));
// pt.x = "0"; // type error
// tsconfig.json 에서 컴파일 옵션 --strictPropertyInitialization
// -> 생성자에서 필드 초기화 해야한다.
var BadGreeter = /** @class */ (function () {
    function BadGreeter() {
        this.name = "hello";
    }
    return BadGreeter;
}());
// readonly
var Greeter = /** @class */ (function () {
    function Greeter(otherName) {
        this.name = "word";
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
    Greeter.prototype.err = function () {
        // this.name = "not ok"; // ERROR
    };
    return Greeter;
}());
var g = new Greeter();
// g.name = "also not ok"; // ERROR
// constructor
var Point1 = /** @class */ (function () {
    function Point1(xs, y, x) {
        if (x === void 0) { x = 0; }
    }
    return Point1;
}());
// Super Call
var Base = /** @class */ (function () {
    function Base() {
        this.k = 4;
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        // console.log(this.k); // this 접근 전에 super() 를 호출해야 한다.
        return _super.call(this) || this;
    }
    return Derived;
}(Base));
// Method
var Point2 = /** @class */ (function () {
    function Point2() {
        this.x = 10;
        this.y = 10;
    }
    Point2.prototype.scale = function (n) {
        this.x *= n; // this 붙이지 않으면 class 외부 변수 참조됨
        this.y *= n;
    };
    return Point2;
}());
// Getter/Setter
// TS 기능이 아닌, JS 원래 기능
// get 만 있고 set 이 없다면 해당 프로퍼티는 자동으로 readonly 가 된다.
// setter 의 parameter 타입을 명시하지 않으면, getter 의 반환타입으로 타입추론됨.
// getter/setter 는 같은 접근지시자를 가져야 한다.
var C = /** @class */ (function () {
    function C() {
        this._length = 0;
    }
    Object.defineProperty(C.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
// ts 4.3부터 getter/setter 에 다영한 타입으로 접근 가능
var Thing = /** @class */ (function () {
    function Thing() {
        this._size = 0;
    }
    Object.defineProperty(Thing.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            var num = Number(value);
            if (!Number.isFinite(num)) {
                this._size = 0;
                return;
            }
            this._size = num;
        },
        enumerable: false,
        configurable: true
    });
    return Thing;
}());
// Index Signatures
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.check = function (s) {
        return this[s];
    };
    return MyClass;
}());
// 인터페이스
var Sonar = /** @class */ (function () {
    function Sonar() {
    }
    Sonar.prototype.ping = function () {
        console.log("ping!");
    };
    return Sonar;
}());
var NameChecker = /** @class */ (function () {
    function NameChecker() {
    }
    // Not Error
    // check(s) { // s: any, string 으로 타입 추론 안된다.
    //   return : s.toLowercase() === "ok"; // Lower"C"ase
    // }
    NameChecker.prototype.check = function (s) {
        return s.toLowerCase() === "ok";
    };
    return NameChecker;
}());
var C1 = /** @class */ (function () {
    function C1() {
        this.x = 0;
    }
    return C1;
}());
var c1 = new C1();
// c1.y = 10; // does not exist
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log("Moving along!");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.woof = function (times) {
        for (var i = 0; i < times; i++) {
            console.log("woof!");
        }
    };
    return Dog;
}(Animal));
var d = new Dog();
d.move();
d.woof(10);
var Base1 = /** @class */ (function () {
    function Base1() {
    }
    Base1.prototype.greet = function () {
        console.log("Hello, World!");
    };
    return Base1;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived1.prototype.greet = function (name) {
        if (name === undefined) {
            _super.prototype.greet.call(this);
        }
        else {
            console.log("Hello, ".concat(name.toUpperCase()));
        }
    };
    return Derived1;
}(Base1));
var d1 = new Derived1();
d1.greet();
d1.greet("reader");
var b = d1;
b.greet();
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base1));
var AnimalHouse = /** @class */ (function () {
    function AnimalHouse(animal) {
        this.resident = animal;
    }
    return AnimalHouse;
}());
var DogHouse = /** @class */ (function (_super) {
    __extends(DogHouse, _super);
    function DogHouse(dog) {
        return _super.call(this, dog) || this;
    }
    return DogHouse;
}(AnimalHouse));
// initialization Order
var Base2 = /** @class */ (function () {
    function Base2() {
        this.name = "base";
        console.log("My name is " + this.name);
    }
    return Base2;
}());
var Derived3 = /** @class */ (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "derived";
        return _this;
    }
    return Derived3;
}(Base2));
new Derived3(); // My name is base
// 1. Base 클래스 필드 초기화
// 2. Base constructor 실행
// 3. Derived 클래스 필드 초기화
// 4. Derived constructor 실행
// Ingeriting Built-in Types
// Error, Array, Map 등을 상속 -> new.target 을 이용하여 prototype chain 을 조종한다. -> 권장하지 않음
var MsgError = /** @class */ (function (_super) {
    __extends(MsgError, _super);
    function MsgError(m) {
        return _super.call(this, m) || this;
        // Object.setPrototypeOf(this, MsgError.prototype); // super 호출 이후에 prototype 을 즉시 조정해주면 된다.
        // MsgError 의 하위 타입도 수동으로 설정해야 한다. __proto__ 를 사용하는 방법도 있다.
        // IE 10 이하 버전에서는 동작하지 않는다.
    }
    MsgError.prototype.sayHello = function () {
        return "hello ".concat(this.message);
    };
    return MsgError;
}(Error));
var msgError = new MsgError("jh");
// msgError.sayHello(); // sayHello() is not a function;
console.log(msgError instanceof MsgError); // false, instanceof 가 깨졌다.
// Member visibility
// public(default): 어느 곳에서나 접근 가능
// protected: 서브클래스에서만 접근 가능 -> 메서드 호출이 클래스 내부여야 함
var Greeter1 = /** @class */ (function () {
    function Greeter1() {
    }
    Greeter1.prototype.greet = function () {
        console.log("Hello, ".concat(this.getName()));
    };
    Greeter1.prototype.getName = function () {
        return "hi";
    };
    return Greeter1;
}());
var SpecialGreeter = /** @class */ (function (_super) {
    __extends(SpecialGreeter, _super);
    function SpecialGreeter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecialGreeter.prototype.howdy = function () {
        console.log("Howdy, ".concat(this.getName())); // 호출 가능
    };
    return SpecialGreeter;
}(Greeter1));
var g1 = new SpecialGreeter();
g1.greet();
g1.howdy();
// g1.getName(); // 서브클래스 내부가 아님
// 상속 계층에서의 protected access
var Base3 = /** @class */ (function () {
    function Base3() {
        this.x = 1;
    }
    return Base3;
}());
var Derived4 = /** @class */ (function (_super) {
    __extends(Derived4, _super);
    function Derived4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 5;
        return _this;
    }
    return Derived4;
}(Base));
var Derived5 = /** @class */ (function (_super) {
    __extends(Derived5, _super);
    function Derived5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived5.prototype.f1 = function (other) {
        other.x = 10;
    };
    Derived5.prototype.f2 = function (other) {
        // Java 에서는 가능, C#/C++/TS 에서는 불가능
        // other.x = 10;
    };
    return Derived5;
}(Base3));
// private: 해당 클래스 외에서는 접근 불가능
// cross-instance private access: 같은 타입의 다른 instance 라면 접근 가능
var A1 = /** @class */ (function () {
    function A1() {
        this.x = 10;
    }
    A1.prototype.sameAs = function (other) {
        return this.x === other.x; // other.x, 다른 인스턴스이지만 같은 타입이므로 접근 가능
    };
    return A1;
}());
// private/protected 는 type checking 시에만 접근제한 한다.
var MySafe = /** @class */ (function () {
    function MySafe() {
        this.secretKey = 12345;
    }
    return MySafe;
}());
var s = new MySafe();
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
var Box = /** @class */ (function () {
    function Box(value) {
        this.contents = value;
    }
    return Box;
}());
var b1 = new Box("hello!"); // Box<string> 으로 타입 추론 된다.
// 타입 변수를 static 변수로 쓸 수 없다.
// this keyword
var MyClass1 = /** @class */ (function () {
    function MyClass1() {
        this.name = "MyClass";
    }
    MyClass1.prototype.getName = function () {
        return this.name;
    };
    return MyClass1;
}());
var c = new MyClass1();
var obj = {
    name: "obj",
    getName: c.getName,
};
console.log(obj.getName()); // obj
// this 는 함수가 어떻게 호출됐는지에 의존한다. (obj 를 통하여 호출됐다면 this 는 obj)
// arrow functions
var MyClass2 = /** @class */ (function () {
    function MyClass2() {
        var _this = this;
        this.name = "MyClass";
        this.getName = function () {
            return _this.name;
        };
    }
    return MyClass2;
}());
var c2 = new MyClass2();
var g2 = c2.getName;
console.log(g2()); // MyClass
function fn(x) {
    /* ... */
}
// -> Compile... In JS
// function fn(x: number) { }
var MyClass3 = /** @class */ (function () {
    function MyClass3() {
        this.name = "MyClass";
    }
    MyClass3.prototype.getName = function () {
        return this.name;
    };
    return MyClass3;
}());
var c3 = new MyClass3();
c3.getName(); // this: MyClass3, OK
var g3 = c3.getName;
// g3(); // this: window, NO
// trade-off
// 1. JS 쪽에서 호출하면 여전히 this context 가 명확하지 않다.
// 2. 인스턴스 당 하나가 아니라 클래스 당 하나의 함수만 할당된다.
// 3. 부모 클래스는 여전히 super 를 통해 호출된다.
// this Types
var Box1 = /** @class */ (function () {
    function Box1() {
        this.contents = "";
    }
    // set(value: string): this, 리턴 타입을 Box 가 아닌 this 로 추론한다.
    Box1.prototype.set = function (value) {
        this.contents = value;
        return this;
    };
    // parameter type annotation 을 this 로 설정할 수도 있다.
    Box1.prototype.sameAs = function (other) {
        return other.contents === this.contents;
    };
    return Box1;
}());
var ClearableBox = /** @class */ (function (_super) {
    __extends(ClearableBox, _super);
    function ClearableBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClearableBox.prototype.clear = function () {
        this.contents = "";
    };
    return ClearableBox;
}(Box1));
var a = new ClearableBox();
var b2 = a.set("hello"); // set(value: string): ClearableBox, 동적으로 리턴타입이 바뀐다.
// this - based type guard
// return 타입에서 [this is Type] 을 사용할 수 있다.
// parameter property
// 생성자에서 public, protected, private, readonly 등을 설정할 수 있다.
// 클래스 표현식, 추상클래스 가능
var Abs = /** @class */ (function () {
    function Abs() {
    }
    return Abs;
}());
// Abs 의 구현체의 생성자를 받아 함수 내에서 인스턴스를 만들고 싶다면...
function greet(ctor) {
    // const instance = new ctor();
}
function greet1(ctor) {
    var instance = new ctor();
    instance.printName();
}
var Derived6 = /** @class */ (function (_super) {
    __extends(Derived6, _super);
    function Derived6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived6.prototype.printName = function () {
        return "printName call";
    };
    return Derived6;
}(Abs));
greet1(Derived6);
// greet1(Abs); Error
// 클래스 간의 관계
var Point3 = /** @class */ (function () {
    function Point3() {
        this.x = 0;
        this.y = 0;
    }
    return Point3;
}());
var Point4 = /** @class */ (function () {
    function Point4() {
        this.x = 0;
        this.y = 0;
    }
    return Point4;
}());
var p = new Point2(); // OK, 내부 구조만 같으면 된다.
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var Employee = /** @class */ (function () {
    function Employee() {
    }
    return Employee;
}());
var p2 = new Employee(); // OK, Person 의 모든 property 가 있다.
// const p3: Employee = new Person(); // Error, salary 가 없다.
var Empty = /** @class */ (function () {
    function Empty() {
    }
    return Empty;
}());
function f(x) { }
f(window);
f({});
f(f);
