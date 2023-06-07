console.log(typeof "Hello world");
let s = "Hello"; // s: string
let n: typeof s; // n: string

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // K = boolean

function f() {
    return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>; // P = { x: number; y: number; }

// Limitation
const msgbox:(x: string) => string = (x) => x;
// let shouldContinue: typeof msgbox("Are you sure you want to continue?"); // ReturnType<> 을 사용