var message = "Hello World!";
console.log(message.toLocaleLowerCase());
// 컴파일러 tsc(타입스크립트 컴파일러)
// tsc [file name]
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date));
}
// greet("Brendan"); // compile error, 그러나 출력 파일이 생성된다.
// tsc --noEmitOnError basic.ts
// 에러가 발생하면 출력 파일을 생성하지 않는다.
function greetWithType(person, date) {
    // 컴파일 시 concat 으로 문자열 연결 된다. 템플릿 문자열은 ES6
    // TypeScript 는 ES3 의 ECMAScript 를 타겟으로 동작한다.
    // 컴파일 옵션으로 --target es2015 설정을 통해 변경 가능하다.
    console.log("Hello ".concat(person, ", today is ").concat(date.toString()));
}
greetWithType("Maddison", new Date());
var msg = "hello there!"; // 타입 추론, let msg: string
// msg = [123]; // 에러
// 타입 검사 엄격도
// 1. cli 에서 --strict 옵션
// 2. tsconfig.json 에 "strict": true 옵션
// noImplicitAny
// any 로 추론되는 변수에 대해 오류를 발생시킨다.
// strictNullChecks
// null, undefined 를 명시적으로 처리한다.
