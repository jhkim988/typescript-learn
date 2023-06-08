type Word = `word`;
type Greeting = `hello ${Word}`; // hello word

type EmailLocaleIds = `welcome_email` | `email_heading`;
type FooterLocaleIds = `footer_title` | `footer_sendoff`;
type AllLocaleIds = `${EmailLocaleIds | FooterLocaleIds}_id`; // welcome_email_id | email_heading_id | footer_title_id | footer_sendoff_id

type Lang = `en` | `ja` | `pt`;
type LocaleMessageIds = `${Lang}_${AllLocaleIds}`; // 12개

// object property 이름 + Changed를 이벤트 이름으로 지정하고 싶다면.
// Observer 패턴
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (oldValue: Type[Key], newValue: Type[Key]) => void
  ): void;
};

function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type> {
  const callbacks = new Map<
    string,
    Array<(oldValue: any, newValue: any) => void>
  >();

  const objWithEvent: Type & PropEventSource<Type> = {
    ...obj,
    on: (eventName, callback) => {
      const propName = eventName.slice(0, eventName.length - 7);
      callbacks.has(propName)
        ? callbacks.get(propName)?.push(callback)
        : callbacks.set(propName, [callback]);
    },
  };

  const handler = {
    set(target, prop, value, receiver) {
      callbacks.get(prop)?.forEach((callback) => {
        callback(receiver[prop], value);
      });
      return Reflect.set(target, prop, value, receiver);
    },
  };

  return new Proxy<Type & PropEventSource<Type>>(objWithEvent, handler);
}

const passedObject = {
  firstName: "Saoirse",
  lastName: " Ronan",
  age: 26,
};

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", (oldValue, newValue) => {
  console.log(`firstName: ${oldValue} -> ${newValue}`);
});

// person.on("firstName", (oldValue, newValue) => { }); // type error

person.firstName = "Alice";
person.firstName = "Bob";
person.firstName = "Charlie";

person.on("ageChanged", (oldValue, newValue) => {
  console.log(`age: ${oldValue} -> ${newValue}`);
});

person.age = 1;
person.age = 2;
person.age = 3;

// intrinsic
type Greeting1 = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting1>; // HELLO, WORLD

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">; // ID-MY_APP

type QuietGreeting = Lowercase<ShoutyGreeting>; // hello, world
type Greeting2 = Capitalize<QuietGreeting>; // Hello, world
type Greeting3 = Uncapitalize<ShoutyGreeting>; // hELLO, WORLD
