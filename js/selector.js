export function getCellElement() {
  const chessboard = getChessboard();
  return chessboard.querySelectorAll("li");
}

export function getChessboardElement() {
  return document.querySelector(".chessboard");
}

export function getStatusElement() {
  return document.querySelector(".heading__status");
}

export function getTurnElement() {
  return document.querySelector(".heading__turn");
}
