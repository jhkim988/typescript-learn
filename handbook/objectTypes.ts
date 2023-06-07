// 1. anonymous type
function greet(person: { name: string; age: number }) {
  return `Hello ${person.name}`;
}

// 2. interface
interface Person {
  name: string;
  age: number;
}
function greet2(person: Person) {
  return `Hello ${person.name}`;
}

// 3. type
type Person2 = {
  name: string;
  age: number;
};
function greet3(person: Person2) {
  return `Hello ${person.name}`;
}

// Optional Properties
type Shape = {};
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // xPos, yPos 를 사용하기 위해서는 null check 필요함.
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  console.log(`coordinated at: (${xPos}, ${yPos})`);
}
const shape = {};
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// default value 를 이용하는 방법
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log(`coordinated at: (${xPos}, ${yPos})`);
}

// 구조분해 패턴에서는 type annotation(:Type) 을 넣을 수가 없다.
// function draw({ shape: Shape, xPos: number = 100 /** */}) {
// 	console.log(shape);
// 	console.log(xPos);
// }

// read only
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  console.log(`prop has the value ${obj.prop}`);
  // obj.prop = "Hello"; // read only
}

interface Home {
  readonly resident: { name: string; age: number }; // resident 가 참조하는 name, age 는 바꿀 수 있다.
}
function visitForBirth(home: Home) {
  console.log(`Happy birthday ${home.resident.name}`);
  home.resident.age++;
}

function evict(home: Home) {
  // Cannot change.
  // home.resident = {
  // 	name: "Victor the Evictor",
  // 	age: 42,
  // }
}

interface Person {
  name: string;
  age: number;
}
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);

// Index Signature
interface StringArray {
  [index: number]: string;
}
const myArray: StringArray = { 0: "1", 1: "2" };
const secondItem = myArray[1]; // secondItem: string

interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name: string; // 모든 string property 를 number 로 할당했다.
}

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number;
  name: string; // 가능
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = { 0: "0", 1: "1", 2: "2" };
// myArray2[2] = "Mallory"; // read only

// Excess Property Checks
// 정의한 타입보다 더 많은 속성을 담은 객체리터럴을 해당 타입 변수에 할당할 때 발생한다.
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

// let mySquare = createSquare({ colour: "red", width: 100 }); // excess property check 발생, color 의 오타를 찾아내준다.
// let mySquare = createSquare({ width: 100, opacity: 0.5 }); // Optional 인 color 는 없어도 되고, opacity 는 메서드에서 사용하지 않도록 하고 싶다면...
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // as SquareConfig

// SquareConfig interface 에 index signature 를 넣는 방법도 있지만,
interface SquareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

let squareOptions2 = { colour: "red", width: 100 };
// excess property check 발생하지 않는다.
createSquare(squareOptions2);
// createSquare({ colour: "red", width: 100 }); // 직접 대입하면 excess property check 로 에러 발생

let squareOptions3 = { colour: "red" };
// createSquare(squareOptions3); // 그러나 SquareConfig 와 공통 프로퍼티가 없다면 에러 발생

// Extending Types, 여러 개 가능
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

// intersection Types
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

draw({ color: "blue", radius: 42 });

// Generic Object Types
interface Box {
  contents: unknown; // any 대신 unknown 을 사용한다면
}

let x: Box = { contents: "hello world" };
// check x.contents
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}
// type assertion
console.log((x.contents as string).toLowerCase());

interface Box2<Type> {
  contents: Type;
}
let box: Box2<string> = { contents: "agnus dei" };
let contents = box.contents; // contents :string

type StringBox = Box2<String>;

// 타입 별로 오버로드 할 필요가 없다.
function setContents<Type>(box: Box2<Type>, newContents: Type) {
  box.contents = newContents;
}

// type alias 를 이용하여, interface 와 달리 helper types 를 정의할 수 있다.
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

// Array type
function doSomething1(value: Array<string>) {
  // ...
}

let myArray1: string[] = ["hello", "world"];
doSomething1(myArray1); // work
doSomething1(new Array("hello", "world"));

// ReadonlyArray Type
function doStuff(values: ReadonlyArray<string>) {
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
  // values.push("hello"); // read only string[]
}

// ReadonlyArray 를 리턴 - 리턴한 배열을 수정하지 않기를 의도
// ReadonlyArray 를 인자로 받음 - 함수 내에서 배열을 수정하지 않음을 보장

// ReadonlyArray -> 직접 생성자를 통해 만들 수 없고, Array 를 ReadonlyArray 로 바꾸는 방식
// new ReadonlyArray("red", "green", "blue");
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

function doStuff1(values: readonly string[]) {
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
  // values.push("hello"); // read only
}

// 할당이 양방향이 아니다.
let x1: readonly string[] = [];
let y1: string[] = [];
x1 = y1;
// y1 = x1; // error

// Tuple Types
// Array 타입의 일종, 원소 개수와 각각의 원소 타입이 정해져 있다.
type StringNumberPair = [string, number];

function doSomething2(pair: [string, number]) {
  const a = pair[0]; // a: string
  const b = pair[1]; // b: number
  console.log(a, b);
}

doSomething2(["hello", 42]);

interface StringNumberPair2 {
  length: 2;
  0: string;
  1: number;
  slice(start?: number, end?: number): Array<string | number>;
}

// ? 를 이용하여
type Either2dOr3d = [number, number, number?];
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord; // x: number, y: number, z: number | undefined
  console.log(`Provided coordinates had ${coord.length} dimensions`); // length: 2 | 3
}

// rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args; // name: string, version: number, input: boolean[]
}

function readButtonInput2(name: string, version: number, ...input: boolean[]) { }

// Readonly Tuple
function doSomething3(pair: readonly [string, number]) {
  // pair[0] = "hello"; // read only
}

let point = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

// distanceFromOrigin(point); // readonly [number, number]

export {};