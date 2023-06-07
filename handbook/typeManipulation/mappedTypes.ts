type Horse = {};

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean; // << Mapped Types
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>; // { darkMode: boolean; newUserProfile: boolean }

// Mapping Modifiers
// : readonly, ?
// : -, +
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]; // readonly modifier 를 지운다.
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>; // { id: string; name: string }

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]; // optional modifier 를 지운다.
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>; // { id: string; name: string; age: number }

// Key Remapping via "as"
// type MappedTypeWithNewProperties<Type> = {
//     [Properties in keyof Type as NewKeyType]: Type[Properties];
// }

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>; // { getName: () => string; getAge: () => number; getLocation: () => string; }

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

// union...
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>; // { squre: (event: SquareEvent) => void; circle: (event: CircleEvent) => void; }

// Futher Exploration
type ExtrantPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPDeletion = ExtrantPII<DBFields>; // { id: false, name: true }
