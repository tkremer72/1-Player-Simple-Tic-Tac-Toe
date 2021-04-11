(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* Peferred method with JS Event Listener */
const toggleButton = document.getElementById('toggle-menu');
const naviList = document.getElementById('navi-list');
toggleButton.addEventListener('click', () => {
  naviList.classList.toggle('active');
});
/* HTML Event Method */

/* function toggleMenu() {
     const naviList = document.getElementById('navi-list');
     naviList.classList.toggle('active');
} */

/* Create an object to hold the game */

var ticTacToe = {
  // (A) PROPERTIES
  board: [],
  // array to hold the current game
  // (B) RESET THE GAME
  reset: function () {
    // (B1) RESET BOARD ARRAY & GET HTML CONTAINER
    ticTacToe.board = [];
    var container = document.getElementById("ticTacToe-game");
    container.innerHTML = ""; // (B2) REDRAW SQUARES

    for (let i = 0; i < 9; i++) {
      ticTacToe.board.push(null);
      var square = document.createElement("div");
      square.innerHTML = "&nbsp;";
      square.dataset.idx = i;
      square.id = "ticTacToe-" + i;
      square.addEventListener("click", ticTacToe.play);
      container.appendChild(square);
    }
  },
  // (C) PLAY - WHEN THE PLAYER SELECTS A SQUARE
  play: function () {
    // (C1) PLAYER'S MOVE - MARK WITH "O"
    var move = this.dataset.idx;
    ticTacToe.board[move] = 0;
    this.innerHTML = "O";
    this.classList.add("player");
    this.removeEventListener("click", ticTacToe.play); // (C2) NO MORE MOVES AVAILABLE - NO WINNER

    if (ticTacToe.board.indexOf(null) == -1) {
      alert("No winner");
      ticTacToe.reset();
    } // (C3) COMPUTER'S MOVE - MARK WITH "X"
    // @TODO - Change to use not bad AI if you want
    else {
        move = ticTacToe.dumbAI(); //move = ticTacToe.notBadAI(); 

        ticTacToe.board[move] = 1;
        var square = document.getElementById("ticTacToe-" + move);
        square.innerHTML = "X";
        square.classList.add("computer");
        square.removeEventListener("click", ticTacToe.play);
      } // (C4) WHO WON?


    win = null; // HORIZONTAL ROW CHECKS

    for (let i = 0; i < 9; i += 3) {
      if (ticTacToe.board[i] != null && ticTacToe.board[i + 1] != null && ticTacToe.board[i + 2] != null) {
        if (ticTacToe.board[i] == ticTacToe.board[i + 1] && ticTacToe.board[i + 1] == ticTacToe.board[i + 2]) {
          win = ticTacToe.board[i];
        }
      }

      if (win !== null) {
        break;
      }
    } // VERTICAL ROW CHECKS


    if (win === null) {
      for (let i = 0; i < 3; i++) {
        if (ticTacToe.board[i] != null && ticTacToe.board[i + 3] != null && ticTacToe.board[i + 6] != null) {
          if (ticTacToe.board[i] == ticTacToe.board[i + 3] && ticTacToe.board[i + 3] == ticTacToe.board[i + 6]) {
            win = ticTacToe.board[i];
          }

          if (win !== null) {
            break;
          }
        }
      }
    } // DIAGONAL ROW CHECKS


    if (win === null) {
      if (ticTacToe.board[0] != null && ticTacToe.board[4] != null && ticTacToe.board[8] != null) {
        if (ticTacToe.board[0] == ticTacToe.board[4] && ticTacToe.board[4] == ticTacToe.board[8]) {
          win = ticTacToe.board[4];
        }
      }
    }

    if (win === null) {
      if (ticTacToe.board[2] != null && ticTacToe.board[4] != null && ticTacToe.board[6] != null) {
        if (ticTacToe.board[2] == ticTacToe.board[4] && ticTacToe.board[4] == ticTacToe.board[6]) {
          win = ticTacToe.board[4];
        }
      }
    } // WE HAVE A WINNER


    if (win !== null) {
      alert("WINNER - " + (win == 0 ? "Player" : "Computer"));
      ticTacToe.reset();
    }
  },
  // (D) DUMB COMPUTER AI, RANDOMLY CHOOSES AN EMPTY SLOT
  dumbAI: function () {
    // (D1) EXTRACT OUT ALL OPEN SLOTS
    var open = [];

    for (let i = 0; i < 9; i++) {
      if (ticTacToe.board[i] === null) {
        open.push(i);
      }
    } // (D2) RANDOMLY CHOOSE OPEN SLOT


    var random = Math.floor(Math.random() * (open.length - 1));
    return open[random];
  },
  // (E) AI WITH A LITTLE MORE INTELLIGENCE
  notBadAI: function () {
    // (E1) INIT
    var move = null;

    var check = function (first, direction, pc) {
      // CHECK() : HELPER FUNCTION, CHECK POSSIBLE WINNING ROW
      //  first : first square number
      //  direction : "R"ow, "C"ol, "D"iagonal
      //  pc : 0 for player, 1 for computer
      var second = 0,
          third = 0;

      if (direction == "R") {
        second = first + 1;
        third = first + 2;
      } else if (direction == "C") {
        second = first + 3;
        third = first + 6;
      } else {
        second = 4;
        third = first == 0 ? 8 : 6;
      }

      if (ticTacToe.board[first] == null && ticTacToe.board[second] == pc && ticTacToe.board[third] == pc) {
        return first;
      } else if (ticTacToe.board[first] == pc && ticTacToe.board[second] == null && ticTacToe.board[third] == pc) {
        return second;
      } else if (ticTacToe.board[first] == pc && ticTacToe.board[second] == pc && ticTacToe.board[third] == null) {
        return third;
      }

      return null;
    }; // (E2) PRIORITY #1 - GO FOR THE WIN
    // CHECK HORIZONTAL ROWS


    for (let i = 0; i < 9; i += 3) {
      move = check(i, "R", 1);

      if (move !== null) {
        break;
      }
    } // CHECK VERTICAL COLUMNS


    if (move === null) {
      for (let i = 0; i < 3; i++) {
        move = check(i, "C", 1);

        if (move !== null) {
          break;
        }
      }
    } // CHECK DIAGONAL


    if (move === null) {
      move = check(0, "D", 1);
    }

    if (move === null) {
      move = check(2, "D", 1);
    } // (E3) PRIORITY #2 - BLOCK PLAYER FROM WINNING
    // CHECK HORIZONTAL ROWS


    for (let i = 0; i < 9; i += 3) {
      move = check(i, "R", 0);

      if (move !== null) {
        break;
      }
    } // CHECK VERTICAL COLUMNS


    if (move === null) {
      for (let i = 0; i < 3; i++) {
        move = check(i, "C", 0);

        if (move !== null) {
          break;
        }
      }
    } // CHECK DIAGONAL


    if (move === null) {
      move = check(0, "D", 0);
    }

    if (move === null) {
      move = check(2, "D", 0);
    } // (E4) RANDOM MOVE IF NOTHING


    if (move === null) {
      move = ticTacToe.dumbAI();
    }

    return move;
  }
};
window.addEventListener("load", ticTacToe.reset);

},{}]},{},[1]);
