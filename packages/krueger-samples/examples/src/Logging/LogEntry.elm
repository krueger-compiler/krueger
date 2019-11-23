module Logging.LogEntry exposing (..)

type alias LogData =
    { rawMessage: String}

type LogEntry 
    = Trace LogData
    | Debug LogData
    | Info LogData
    | Warning LogData
    | Error LogData
    | Fatal LogData