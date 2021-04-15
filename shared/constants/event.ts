export enum SERVER_EVENT_NAME {
  Notify = "notify",
  UpdateGameMatchingStatus = "update game matcher status",
  GetGameSettings = "get game settings",
  GetPlayerList = "get player list",
  NewGame = "new game",
  GetCards = "get cards",
  CardPlayed = "card played",
  ChargePointChanged = "charge point changed",
  Overcharged = "overcharged",
  PlayerEliminated = "player eliminated",
  GameOver = "game over",
  NewTurn = "new turn",
  HitPointChanged = "hit point changed",
  TakeSpell = "take spell",
  ActivatePassive = "activate passive",
}

export enum CLIENT_EVENT_NAME {
  FindGame = "find game",
  Ready = "ready",
  RejectGame = "reject game",
  PlayCard = "play card",
  LeaveGame = "leave game",
}
