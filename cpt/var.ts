let isTypescript: boolean = true;
let count: number = 3;
let str: string = "string";
let obj: object = { a: "123" };
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let tuple: [string, number] = ["123", 123];

enum OS {
  Mac,
  Window,
  Linux,
}
let myOs: OS = OS.Mac;
// let os1: OS = OS[0]; // ???

let anyvalue: any = "hi";
anyvalue = 1;
anyvalue = [10, 20, 30];

let unuseful: void = undefined;
// unuseful = null; // ???

let udf: undefined = undefined;
let nll: null = null;

// 함수의 끝에 도달하지 않을 때 사용하는 타입
function neverEnd(): never {
  while (true);
}
