module ElmAst.Ast exposing (..)

import Json.Encode as E

type alias Point =
    { line: Int 
    , column: Int
    , offset: Int
    }

type alias Position =
    { start: Point 
    , end: Point
    , indent : Maybe (List Int)
    }

type alias Node a = { a | position: Maybe Position }

type alias Parent c a = Node { a | children: List (Node c) }

type alias Literal v a = Node { a | value : v }

type Ast 
    = Root (Parent Module {data: E.Value} )

type alias ModuleName = List String    

type alias DefaultModuleData =
    { moduleName: ModuleName }

type alias EffectModuleData =
    { moduleName: ModuleName }

type Module 
    = NormalModule (Node DefaultModuleData)
    | PortModule (Node DefaultModuleData)
    | EffectModule (Node EffectModuleData)