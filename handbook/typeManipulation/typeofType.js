console.log(typeof "Hello world");
var s = "Hello"; // s: string
var n; // n: string
function f() {
    return { x: 10, y: 3 };
}
// Limitation
var msgbox = function (x) { return x; };
// let shouldContinue: typeof msgbox("Are you sure you want to continue?"); // ReturnType<> 을 사용
