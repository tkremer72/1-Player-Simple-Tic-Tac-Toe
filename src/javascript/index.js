/* Peferred method with JS Event Listener */
const toggleButton = document.getElementById('toggle-menu');
const naviList = document.getElementById('navi-list');
toggleButton.addEventListener('click', () => {
     naviList.classList.toggle('active');
})

/* HTML Event Method */

/* function toggleMenu() {
     const naviList = document.getElementById('navi-list');
     naviList.classList.toggle('active');
} */

/* Create an object to hold the game */

var game = {
  // (A) PROPERTIES
  board : [], // array to hold the current game

  // (B) RESET THE GAME
  reset : function () {
    // (B1) RESET BOARD ARRAY & GET HTML CONTAINER
    game.board = [];
    var container = document.getElementById("ttt-game");
    container.innerHTML = "";

    // (B2) REDRAW SQUARES
    for (let i=0; i<9; i++) {
      game.board.push(null);
      var square = document.createElement("div");
      square.innerHTML = "&nbsp;";
      square.dataset.idx = i;
      square.id = "ttt-" + i;
      square.addEventListener("click", game.play);
      container.appendChild(square);
    }
  },

  // (C) PLAY - WHEN THE PLAYER SELECTS A SQUARE
  play : function () {
    // (C1) PLAYER'S MOVE - MARK WITH "O"
    var move = this.dataset.idx;
    game.board[move] = 0;
    this.innerHTML = "O"
    this.classList.add("player");
    this.removeEventListener("click", game.play);

    // (C2) NO MORE MOVES AVAILABLE - NO WINNER
    if (game.board.indexOf(null) == -1) {
      alert("No winner");
      game.reset();
    }

    // (C3) COMPUTER'S MOVE - MARK WITH "X"
    // @TODO - Change to use not bad AI if you want
    else {
      move = game.dumbAI();
      //move = game.notBadAI(); 
      game.board[move] = 1;
      var square = document.getElementById("ttt-" + move);
      square.innerHTML = "X"
      square.classList.add("computer");
      square.removeEventListener("click", game.play);
    }

    // (C4) WHO WON?
    win = null;
    
    // HORIZONTAL ROW CHECKS
    for (let i=0; i<9; i+=3) {
      if (game.board[i]!=null && game.board[i+1]!=null && game.board[i+2]!=null) {
        if ((game.board[i] == game.board[i+1]) && (game.board[i+1] == game.board[i+2])) { win = game.board[i]; }
      }
      if (win !== null) { break; }
    }
    
    // VERTICAL ROW CHECKS
    if (win === null) {
      for (let i=0; i<3; i++) {
        if (game.board[i]!=null && game.board[i+3]!=null && game.board[i+6]!=null) {
          if ((game.board[i] == game.board[i+3]) && (game.board[i+3] == game.board[i+6])) { win = game.board[i]; }
          if (win !== null) { break; }
        }
      }
    }
    
    // DIAGONAL ROW CHECKS
    if (win === null) {
      if (game.board[0]!=null && game.board[4]!=null && game.board[8]!=null) {
        if ((game.board[0] == game.board[4]) && (game.board[4] == game.board[8])) { win = game.board[4]; }
      }
    }
    if (win === null) {
      if (game.board[2]!=null && game.board[4]!=null && game.board[6]!=null) {
        if ((game.board[2] == game.board[4]) && (game.board[4] == game.board[6])) { win = game.board[4]; }
      }
    }

    // WE HAVE A WINNER
    if (win !== null) {
      alert("WINNER - " + (win==0 ? "Player" : "Computer"));
      game.reset();
    }
  },

  // (D) DUMB COMPUTER AI, RANDOMLY CHOOSES AN EMPTY SLOT
  dumbAI : function () {
    // (D1) EXTRACT OUT ALL OPEN SLOTS
    var open = [];
    for (let i=0; i<9; i++) {
      if (game.board[i] === null) { open.push(i); }
    }

    // (D2) RANDOMLY CHOOSE OPEN SLOT
    var random = Math.floor(Math.random() * (open.length-1));
    return open[random];
  },

  // (E) AI WITH A LITTLE MORE INTELLIGENCE
  notBadAI : function () {
    // (E1) INIT
    var move = null;
    var check = function(first, direction, pc) {
    // CHECK() : HELPER FUNCTION, CHECK POSSIBLE WINNING ROW
    //  first : first square number
    //  direction : "R"ow, "C"ol, "D"iagonal
    //  pc : 0 for player, 1 for computer

      var second = 0, third = 0;
      if (direction=="R") {
        second = first + 1;
        third = first + 2;
      } else if (direction=="C") {
        second = first + 3;
        third = first + 6;
      } else {
        second = 4;
        third = first==0 ? 8 : 6;
      }

      if (game.board[first]==null && game.board[second]==pc && game.board[third]==pc) {
        return first;
      } else if (game.board[first]==pc && game.board[second]==null && game.board[third]==pc) {
        return second;
      } else if (game.board[first]==pc && game.board[second]==pc && game.board[third]==null) {
        return third;
      }
      return null;
    };

    // (E2) PRIORITY #1 - GO FOR THE WIN
    // CHECK HORIZONTAL ROWS
    for (let i=0; i<9; i+=3) {
      move = check(i, "R", 1);
      if (move!==null) { break; }
    }
    // CHECK VERTICAL COLUMNS
    if (move===null) {
      for (let i=0; i<3; i++) {
        move = check(i, "C", 1);
        if (move!==null) { break; }
      }
    }
    // CHECK DIAGONAL
    if (move===null) { move = check(0, "D", 1); }
    if (move===null) { move = check(2, "D", 1); }

    // (E3) PRIORITY #2 - BLOCK PLAYER FROM WINNING
    // CHECK HORIZONTAL ROWS
    for (let i=0; i<9; i+=3) {
      move = check(i, "R", 0);
      if (move!==null) { break; }
    }
    // CHECK VERTICAL COLUMNS
    if (move===null) {
      for (let i=0; i<3; i++) {
        move = check(i, "C", 0);
        if (move!==null) { break; }
      }
    }
    // CHECK DIAGONAL
    if (move===null) { move = check(0, "D", 0); }
    if (move===null) { move = check(2, "D", 0); }

    // (E4) RANDOM MOVE IF NOTHING
    if (move===null) { move = game.dumbAI(); }
    return move;
  }
};
window.addEventListener("load", game.reset);