var squareLen = document.querySelectorAll(".square").length;
var squares = document.querySelectorAll(".square");
var player1ScoreField = document.querySelector(".player1");
var player2ScoreField = document.querySelector(".player2");
var drawScoreField = document.querySelector(".draw");
var round = document.querySelector("#round");
var selectedRound;

var playerSign = ["X", "0"];
var player1 = "X";
var player2 = "0";
var player1Score = 0;
var player2Score = 0;
var drawScore = 0;
var currentPlayerSign = player1;
var win_com = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function roundSelection() {
  round.addEventListener("change", function () {
    selectedRound = round.value;
    alert("Selected Round is " + selectedRound);
  });
}

roundSelection();

for (let i = 0; i < squareLen; i++) {
  document
    .querySelectorAll(".square")
    [i].addEventListener("click", function () {
      if (player1Score + player2Score + drawScore < selectedRound) {
        if (this.textContent === "") {
          this.textContent = currentPlayerSign;
          if (checkWin(currentPlayerSign)) {
            if (currentPlayerSign == player1) {
              player1Score++;
              player1ScoreField.textContent = player1Score;
              alert("This Round goes to Player 1!");
            } else {
              player2Score++;
              player2ScoreField.textContent = player2Score;
              alert("This Round goes to Player 2!");
            }
            resetBoard(currentPlayerSign);
            return;
          }
          if (checkDraw()) {
            alert("Match is tied");
            drawScore++;
            drawScoreField.textContent = drawScore;
            resetBoard(currentPlayerSign);
            return;
          }

          currentPlayerSign = currentPlayerSign == player1 ? player2 : player1;
        } else {
          alert("This field is already selected!");
        }
      } else if (player1Score + player2Score + drawScore == selectedRound) {
        if (player1Score > player2Score) {
          alert("Player 1 has won the game!");
        } else if (player2Score > player1Score) {
          alert("Player 2 has won the game!");
        } else {
          alert("The Game is Tied!");
        }
      } else {
        alert("The Round is Finished");
      }
    });
}

function checkWin(currentPlayer) {
  for (let i = 0; i < win_com.length; i++) {
    var [a, b, c] = win_com[i];
    if (
      squares[a].textContent == currentPlayer &&
      squares[b].textContent == currentPlayer &&
      squares[c].textContent == currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (let i = 0; i < squareLen; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function resetBoard(currentPlayer) {
  for (let i = 0; i < squareLen; i++) {
    squares[i].textContent = "";
    currentPlayer = currentPlayerSign;
  }
}
