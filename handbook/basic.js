var message = "Hello World!";
console.log(message.toLocaleLowerCase());
// 컴파일러 tsc(타입스크립트 컴파일러)
// tsc [file name]
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date));
}
greet("Brendan"); // compile error, 그러나 출력 파일이 생성된다.
// tsc --noEmitOnError basic.ts
// 에러가 발생하면 출력 파일을 생성하지 않는다.
function greetWithType(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toString()));
}
greetWithType("Maddison", new Date());
var msg = "hello there!"; // 타입 추론, let msg: string
// msg = [123]; // 에러
