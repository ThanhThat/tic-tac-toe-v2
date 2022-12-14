export function getCellElement() {
  const chessboard = getChessboardElement();
  return chessboard.querySelectorAll("li");
}

export function getChessboardElement() {
  return document.querySelector(".chessboard");
}

export function getStatusElement() {
  return document.querySelector(".heading__status > span");
}

export function getTurnElement() {
  return document.querySelector(".heading__turn > span");
}

export function getReplayButton() {
  return document.querySelector(".replayGameBtn");
}
