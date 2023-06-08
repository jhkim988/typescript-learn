"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function makeWatchedObject(obj) {
    var callbacks = new Map();
    var objWithEvent = __assign(__assign({}, obj), { on: function (eventName, callback) {
            var _a;
            var propName = eventName.slice(0, eventName.length - 7);
            callbacks.has(propName)
                ? (_a = callbacks.get(propName)) === null || _a === void 0 ? void 0 : _a.push(callback)
                : callbacks.set(propName, [callback]);
        } });
    var handler = {
        set: function (target, prop, value, receiver) {
            var _a;
            (_a = callbacks.get(prop)) === null || _a === void 0 ? void 0 : _a.forEach(function (callback) {
                callback(receiver[prop], value);
            });
            return Reflect.set(target, prop, value, receiver);
        },
    };
    return new Proxy(objWithEvent, handler);
}
var passedObject = {
    firstName: "Saoirse",
    lastName: " Ronan",
    age: 26,
};
var person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
});
person.on("firstNameChanged", function (oldValue, newValue) {
    console.log("firstName: ".concat(oldValue, " -> ").concat(newValue));
});
// person.on("firstName", (oldValue, newValue) => { }); // type error
person.firstName = "Alice";
person.firstName = "Bob";
person.firstName = "Charlie";
person.on("ageChanged", function (oldValue, newValue) {
    console.log("age: ".concat(oldValue, " -> ").concat(newValue));
});
person.age = 1;
person.age = 2;
person.age = 3;
