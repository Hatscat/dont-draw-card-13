import {
  assign,
  castInt,
  decrement,
  defineFunc,
  dynamicProp,
  List,
  loop,
  mul,
  prop,
} from "../deps.ts";
import { functions, tmpRefs } from "../variables.ts";

export function defineShuffleArray() {
  return defineFunc({
    name: functions.shuffleArray,
    args: [tmpRefs.obj],
    body: loop({
      init: assign(tmpRefs.index, prop(tmpRefs.obj, "length")),
      condition: decrement(tmpRefs.index),
      body: assign(tmpRefs.n, castInt(mul("Math.random()", tmpRefs.index))),
      body2: assign(
        List(
          dynamicProp(tmpRefs.obj, tmpRefs.index),
          dynamicProp(tmpRefs.obj, tmpRefs.n),
        ),
        List(
          dynamicProp(tmpRefs.obj, tmpRefs.n),
          dynamicProp(tmpRefs.obj, tmpRefs.index),
        ),
      ),
    }),
  });
}
