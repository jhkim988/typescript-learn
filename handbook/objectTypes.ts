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
interface SquareConfig {
	color?: string;
	width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
	return {
		color: config.color || "red",
		area: config.width ? config.width * config.width : 20
	};
}

let mySquare = createSquare({ color: "red", width: 100 });