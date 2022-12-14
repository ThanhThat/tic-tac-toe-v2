import { CELL_VALUE, GAME_STATUS, TURN } from "./constants.js";
import {
  getCellElement,
  getChessboardElement,
  getReplayButton,
  getStatusElement,
  getTurnElement,
} from "./selector.js";

let turn = TURN.TURN_X;
let status = GAME_STATUS.PLAYING;
let cellValues = new Array(9).fill("");

function initCellValue() {
  const chessboard = getChessboardElement();
  if (!chessboard) return;

  const cellElement = getCellElement();
  if (cellElement) {
    cellElement.forEach((cell, index) => {
      cell.dataset.index = index;
    });
  }

  chessboard.addEventListener("click", (e) => {
    if (!e.target.tagName === "LI") return;

    const isClicked =
      e.target.classList.contains("cross") ||
      e.target.classList.contains("circle");

    if (isClicked || status !== GAME_STATUS.PLAYING) return;

    const index = e.target.dataset.index;
    const turnElement = getTurnElement();
    if (turn === TURN.TURN_X) {
      e.target.classList.add("cross");
      cellValues[index] = CELL_VALUE.CROSS;
      turn = TURN.TURN_O;
    } else {
      e.target.classList.add("circle");
      cellValues[index] = CELL_VALUE.CIRCLE;
      turn = TURN.TURN_X;
    }
    turnElement.textContent =
      turn === TURN.TURN_X ? CELL_VALUE.CROSS : CELL_VALUE.CIRCLE;

    const game = checkGameStatus(cellValues);

    switch (game.status) {
      case GAME_STATUS.END_GAME:
      case GAME_STATUS.X_WIN:
      case GAME_STATUS.O_WIN: {
        const statusElement = getStatusElement();
        if (statusElement) statusElement.textContent = game.status;
        if (game.winPosition.length !== 0) {
          game.winPosition.forEach((x) => {
            cellElement[x].classList.add("win");
          });
        }
        status = game.status;

        initReplayButton(game);
      }

      default:
      // Playing
    }
  });
}

function checkGameStatus(cellValues) {
  if (!Array.isArray(cellValues) || cellValues.length === 0) return;
  const caseWinList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let checkGame = false;

  for (const caseArr of caseWinList) {
    const first = caseArr[0];
    const second = caseArr[1];
    const third = caseArr[2];

    // console.log("1", cellValues[first]);
    // console.log("2", cellValues[second]);
    // console.log("3", cellValues[third]);

    checkGame =
      cellValues[first] !== "" &&
      cellValues[first] === cellValues[second] &&
      cellValues[second] === cellValues[third];
    if (checkGame) {
      return {
        status:
          cellValues[first] === CELL_VALUE.CROSS
            ? GAME_STATUS.X_WIN
            : GAME_STATUS.O_WIN,
        winPosition: caseArr,
      };
    }
  }

  const checkEndGame = cellValues.filter((x) => x === "").length === 0;
  if (!checkGame) {
    return {
      status: checkEndGame ? GAME_STATUS.END_GAME : GAME_STATUS.PLAYING,
      winPosition: [],
    };
  }

  return null;
}

function resetGame(e) {
  // reset status
  status = GAME_STATUS.PLAYING;
  // reset cellValues
  cellValues = cellValues.map(() => "");

  // reset Turn
  turn = TURN.TURN_X;
  // reset Dom li Element
  const statusElement = getStatusElement();
  if (statusElement) statusElement.textContent = status;

  const turnElement = getTurnElement();
  if (turnElement)
    turnElement.textContent =
      turn === TURN.TURN_X ? CELL_VALUE.CROSS : CELL_VALUE.CIRCLE;

  const cellElementList = getCellElement();
  if (cellElementList) {
    cellElementList.forEach((cell) => {
      cell.className = "";
    });
  }

  e.target.style.display = "none";
}

function initReplayButton() {
  const replayGameBtn = getReplayButton();
  if (!replayGameBtn) return;
  replayGameBtn.style.display = "inline-block";
  replayGameBtn.addEventListener("click", resetGame);
}

(() => {
  initCellValue();
})();
