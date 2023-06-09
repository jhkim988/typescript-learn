"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
var pt = new Point();
pt.x = 0;
pt.y = 0;
console.log("".concat(pt.x, ", ").concat(pt.y));
// pt.x = "0"; // type error
// tsconfig.json 에서 컴파일 옵션 --strictPropertyInitialization
// -> 생성자에서 필드 초기화 해야한다.
var BadGreeter = /** @class */ (function () {
    function BadGreeter() {
        this.name = "hello";
    }
    return BadGreeter;
}());
// readonly
console.log(typeof NaN);
