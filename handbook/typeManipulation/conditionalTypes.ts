interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string; // true, number
type Example2 = RegExp extends Animal ? number : string; // false, string

interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

// 오버로드의 번거로움
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// 제네릭 타입 T에 따라 IdLabel 인지 NameLabel 인지 달라지는 타입을 만들 수 있다.
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

// 오버로드의 번거로움을 해결할 수 있다.
function createLabel1<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}
let a = createLabel1("typescript"); // a: NameLabel
let b = createLabel1(2.8); // b: IdLabel
let c = createLabel1(Math.random() ? "hello" : 42); // IdLabel | NameLabel

// Conditional Type Constraints
type MessageOf<T extends { message: unknown }> = T["message"];
interface Email {
    message: string;
}
type EmailMessageContents = MessageOf<Email>; // string

type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;
type EmailMessageContents2 = MessageOf2<Email>; // string
type DogMessageContents = MessageOf2<Dog>; // never

type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number;


// Inferring Within Conditional Types
// infer 키워드 사용
type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;
type Num2 = GetReturnType<() => number>; // number
type Str2 = GetReturnType<(x: string) => string>; // string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // boolean[]

function stringOrNum(x: string): number;
function stringOrNum(x: number): string;
function stringOrNum(x: string | number) : string | number;
function stringOrNum(x: string | number): string | number {
    throw "unimplemented";
}
type T1 = ReturnType<typeof stringOrNum>; // string | number, 마지막 signature 에서 추론이 이루어진다.

// Distributive Conditional Types
// conditional type 이 제네릭 타입에 적용되면, union type 에 대해서 분배법칙
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[], (string | number)[] 가 아니다.
// (string | number) --acts ToArray--> ToArray<string> | ToArray<number> = string[] | number[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrANumArr2 = ToArray<string | number>; // (string | number)[]
