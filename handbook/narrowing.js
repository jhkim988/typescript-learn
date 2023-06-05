// 타입 축소
function padLeft(padding, input) {
    // padding: number | string
    if (typeof padding === "number") {
        // padding: number
        return " ".repeat(padding) + input;
    }
    //padding: string
    return padding + input;
}
// 타입 가드
// typeof 리턴 값
// string, number, bigint, boolean, symbol, undefined, object, function
console.log("typeof null: ", typeof null);
function printAll(strs) {
    if (typeof strs === "object") {
        // for (const s of strs) { } // strs 는 null 일 수 있다.
    }
}
