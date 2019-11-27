port module ElmParser exposing (main)

import Elm.Parser
import Elm.RawFile as RF exposing (RawFile)
import ElmAst.Transformer as Tx
import ElmAst.Parser as P
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import Parser exposing (DeadEnd)

-- Ports
port channelOut : Value -> Cmd msg
port channelIn : (Request -> msg) -> Sub msg

-- Platform Setup
main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }

-- Model


type alias Request =
    String


type alias Response = Value


type alias Model =
    List ( Request, Response )


type alias Flags =
    String


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( [], Cmd.none )

-- Update


type Msg
    = Parse Request


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Parse request ->
            let
                response =
                    parse request

                updateModel =
                    ( request, response ) :: model
            in
            ( updateModel, channelOut response )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ channelIn Parse
        ]


parse : String -> Value
parse input =
    Elm.Parser.parse input
    |> encodeParserResult

-- parseAsElmAst : String -> Value
-- parseAsElmAst input =
--     P.

encodeDeadEnd : DeadEnd -> Value
encodeDeadEnd error =
    JE.object
        [ ("row", JE.int error.row)
        , ("col", JE.int error.col)
        , ("problem", JE.string (Debug.toString error.problem))
        ]    

encodeParserResult : Result (List DeadEnd) RawFile -> Value
encodeParserResult result =
    case result of
        Err errors ->
            JE.object
                [("type", JE.string "Failure" )
                , ("errors", JE.list encodeDeadEnd errors)
                ]
        Ok rawFile ->
            JE.object
                [("type", JE.string "Success")
                ,("data", RF.encode rawFile)
                ]            
            