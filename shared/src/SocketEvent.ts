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
  TakeSpell = "take spell",
  Purify = "purify",
  FindGame = "find game",
  Connected = "connected",
}

export default SOCKET_EVENT;
