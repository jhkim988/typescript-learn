function createLabel(nameOrId) {
    throw "unimplemented";
}
// 오버로드의 번거로움을 해결할 수 있다.
function createLabel1(idOrName) {
    throw "unimplemented";
}
var a = createLabel1("typescript"); // a: NameLabel
var b = createLabel1(2.8); // b: IdLabel
var c = createLabel1(Math.random() ? "hello" : 42); // IdLabel | NameLabel
function stringOrNum(x) {
    throw "unimplemented";
}
