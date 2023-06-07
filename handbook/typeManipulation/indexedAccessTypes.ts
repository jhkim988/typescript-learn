type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // number

type I1 = Person["age" | "name"]; // string | number
type I2 = Person[keyof Person]; // string | number | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // string | boolean
// type I4 = Person["aliv"]; 없는 index 라면 에러

const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
]; // MyArray: { name: string, age: number }[]
type Person1 = typeof MyArray[number]; // { name: string, age: number }
type Age1 = typeof MyArray[number]["age"]; // number
type Age2 = Person["age"];

// const key = "age";
// type Age3 = Person1[key]; // type 만 가능하다.

type key = "age";
type Age3 = Person1[key];