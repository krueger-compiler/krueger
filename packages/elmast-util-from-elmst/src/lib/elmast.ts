import * as Unist from "unist";
import { Literal } from "estree";

export interface Root extends Unist.Parent {
  type: "root";
  children: [Module] | [];
}

export type ModuleName = ReadonlyArray<String>;

export type Module = NormalModule | PortModule | EffectModule;
export interface NormalModule extends Unist.Parent {
  type: "normalModule";
  name: ModuleName;
  children: (ExposingList | Comment)[];
}

export interface PortModule extends Unist.Parent {
  type: "portModule";
  name: ModuleName;
  children: (ExposingList | Comment)[];
}

export interface EffectModule extends Unist.Parent {
  type: "effectModule";
  name: ModuleName;
  children: (ExposingList | Comment)[];
}

export interface ExposingList extends Unist.Parent {
  type: "exposingList";
  children: [ExposeAll] | (ExposedMember | ExposeTypeConstructor)[];
}

export interface ExposeAll extends Unist.Literal {
  value: WildCardExpose;
}
export interface ExposedMember extends Unist.Literal {
  value: String;
}

export interface ExposeCustomType extends Unist.Parent {
  children: [ExposeAll] | ExposeTypeConstructor[];
}

export interface ExposeTypeConstructor extends Unist.Literal {}

type WildCardExpose = typeof WildCardExposeSymbol;
const WildCardExposeSymbol = Symbol("*");

export interface Comment extends Unist.Literal {
  type: "comment";
}

namespace Exposing {
  export interface All extends Unist.Literal {}
}
