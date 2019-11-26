namespace ElmSyntax {
  export interface Node<A> {
    range: Range;
    value: A;
  }
  export interface File {
    moduleDefinition: Node<Module>;
    comments: Node<Comment>[];
  }

  export type Module = NormalModule | PortModule;

  export interface NormalModule {
    type: "normal";
    normal: DefaultModuleData;
  }

  export interface PortModule {
    type: "port";
    port: DefaultModuleData;
  }

  interface DefaultModuleData {
    moduleName: Node<ModuleName>;
    exposingList: Node<Exposing>;
  }

  export type ModuleName = string[];
  export type Exposing = unknown;

  export interface Range {
    start: Location;
    end: Location;
  }

  export interface Location {
    row: number;
    column: number;
  }

  export interface Comment {
    value: string;
  }
}
