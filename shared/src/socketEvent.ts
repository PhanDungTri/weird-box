enum SOCKET_EVENT {
  Error = "error",
  Info = "info",
  GetGameInfo = "get game info",
  TakeCard = "take card",
  PlayCard = "play card",
  CardPlayed = "card played",
  ConsumeCard = "consume card",
  ChargePointBarExplode = "charge point bar explode",
  HitPointChanged = "hit point changed",
  ChargePointChanged = "charge point changed",
  DealCard = "deal card",
  StartTurn = "start turn",
}

export default SOCKET_EVENT;
