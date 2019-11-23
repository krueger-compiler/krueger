import { Parent } from "unist";

export default function transform(ast: ElmSyntax.ModuleDeclaration): Parent {
  return {
    type: "root",
    children: []
  };
}

namespace ElmSyntax {
  interface Node {}
  export interface ModuleDeclaration extends Node {}
}
