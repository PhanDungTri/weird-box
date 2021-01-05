enum SOCKET_EVENT {
  Error = "error",
  Info = "info",
  GetGameInfo = "get game info",
  GetPlayerList = "get player list",
  TakeCard = "take card",
  PlayCard = "play card",
  CardPlayed = "card played",
  ConsumeCard = "consume card",
  ChargePointBarOvercharged = "charge point bar overcharged",
  HitPointChanged = "hit point changed",
  ChargePointChanged = "charge point changed",
  StartTurn = "start turn",
  TakeEffect = "take effect",
  TickEffect = "tick effect",
  Sanitize = "sanitize",
}

export default SOCKET_EVENT;
