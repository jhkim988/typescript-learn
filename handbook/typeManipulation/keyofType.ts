type Point = { x: number; y: number };
type P = keyof Point; // P = "x" | "y"

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // M = string | number, js 에서 key 는 항상 문자열로 변환되기 때문에, obj[0] 은 obj["0"] 이다.
 