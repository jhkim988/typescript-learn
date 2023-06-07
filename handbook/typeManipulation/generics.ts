// Hello Generic
// arg 의 타입과 리턴 타입이 같다.
function identity<Type>(arg: Type): Type {
  return arg;
}

let output1 = identity<string>("myString"); // output: string
let output2 = identity("myString"); // output: string, <string> 을 쓰지 않아도 타입 추론이 된다.

// Working with Generic Type Variable
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity2<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
let myIdentity2: { <Type>(arg: Type): Type } = identity;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
let myIdentity3: GenericIdentityFn = identity;

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
let myIdentity4: GenericIdentityFn2<number> = identity;

// Generic Classes
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// Generic Constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity3<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

// Using Type Parameters in Generic Constraints
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
// getProperty(x, "m"); // error

// Using Class Types in Generics
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs: 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// Generic Parameter Defaults
// T 의 default 를 HTMLDivElement, U의 default 를 T[] 로 설정한다.
interface Container<T, U> {}
function create1<T extends HTMLElement = HTMLDivElement, U = T[]>(
  element?: T,
  children?: U
): Container<T, U> {
  return {};
}
