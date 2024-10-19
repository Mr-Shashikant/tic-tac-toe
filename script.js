let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGameBtn");
let winnerPopUp = document.querySelector("#winnerPopUp");
let winner = document.querySelector("#winner");
let hider = document.querySelector(".hider");
let turnDisplay = document.querySelector(".turn");

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let turnO = true;

let tracker = 0;
boxes.forEach((val) => {
  val.addEventListener("click", () => {
    if (turnO) {
      val.style.color = "red";
      val.style.textShadow = "0 0 20px red";
      val.innerHTML = "O";
      turnO = false;
    } else {
      val.style.color = "blue";
      val.style.textShadow = "0 0 20px blue";
      val.innerHTML = "X";
      turnO = true;
    }
    val.disabled = true;
    checkWinner();

    turnDisplay.innerText = turnO == true ? "Turn: Player 1" : "Turn: Player 2";
  });
});

const showWinner = (val) => {
  winner.innerHTML = val == "O" ? "<b>Player 1</b> won the game" : "<b>Player 2</b> won the game";
  winnerPopUp.classList.remove("hide");
  winnerPopUp.classList.add("show");
  hider.classList.remove("hide");
};

const draw = () => {
  winner.innerText = `It's a draw!`;
  winnerPopUp.classList.remove("hide");
  winnerPopUp.classList.add("show");
  hider.classList.remove("hide");
};

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

const checkWinner = () => {
  tracker++;
  if (tracker == 9) {
    draw();
  }
  for (const val of winPattern) {
    const positions = val.map((index) => boxes[index]);
    const values = positions.map((position) => position.innerText);
    if (values[0] != "" && values[1] != "" && values[2] != "") {
      if (values[0] == values[1] && values[1] == values[2]) {
        showWinner(values[0]);
        disableBoxes();
        positions.forEach((position) => {
          position.style.backgroundColor = "green";
          position.style.color = "#fff";
          position.style.textShadow = "none";
        });
      }
    }
  }
};

const resetGame = () => {
  turnO = true;
  tracker = 0;
  turnDisplay.innerText = "Turn: Player 1";
  winnerPopUp.classList.add("hide");
  winnerPopUp.classList.remove("show");
  hider.classList.add("hide");
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ddd";
  }
};

resetBtn.addEventListener("click", () => resetGame());
newGameBtn.addEventListener("click", () => resetGame());
