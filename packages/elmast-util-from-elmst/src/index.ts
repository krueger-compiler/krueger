import { Parent } from "unist";
import { Root, Module, Comment } from "./lib/elmast";
import { type } from "os";
//import { ElmSyntax } from "./lib/elm-syntax";

export default function transform(ast: ElmSyntax.File): Root {
  console.log("[transform] - AST: ", ast);

  const comments = toComments(ast);
  const module = toModule(ast.moduleDefinition, comments);

  return {
    type: "root",
    children: [module]
  };
}

function toModule(
  moduleDefinitionNode: ElmSyntax.Node<ElmSyntax.Module>,
  comments: Comment[]
): Module {
  const moduleDefinition = moduleDefinitionNode.value;
  const children: Comment[] = [];
  comments.forEach(comment => children.push(comment));
  switch (moduleDefinition.type) {
    case "normal":
      console.log("[transform] - Module - ", moduleDefinition.normal);
      return {
        type: "normalModule",
        name: moduleDefinition.normal.moduleName.value,
        children: children
      };
    case "port":
      console.log("[transform] - Module - ", moduleDefinition.port);
      return {
        type: "portModule",
        name: moduleDefinition.port.moduleName.value,
        children: children
      };
  }
}

function toComments(file: ElmSyntax.File): Comment[] {
  return file.comments.map(n => {
    return {
      type: "comment",
      value: n.value.value
    };
  });
}
