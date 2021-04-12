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

/* TIC TAC TOE GAME BELOW *

/* Create an object to hold the game */

var game = {
  //(1)Properties
  board: [],
  // array to hold the current game
  // (2) Reset the game
  reset: function () {
    // (2a) Reset the board array and get HTML container
    game.board = [];
    var container = document.getElementById("tic_tac_toe_game");
    container.innerHTML = ""; // (2b) Redraw the board squares

    for (let i = 0; i < 9; i++) {
      game.board.push(null);
      var square = document.createElement("div");
      square.innerHTML = "&nbsp;";
      square.dataset.idx = i;
      square.id = "tic_tac_toe_" + i;
      square.addEventListener("click", game.play);
      container.appendChild(square);
    }
  },
  // (3) Play - When the player selects a square
  play: function () {
    // (3a) Players move - mark square with an 'O'
    var move = this.dataset.idx;
    game.board[move] = 0;
    this.innerHTML = "O";
    this.classList.add("player");
    this.removeEventListener("click", game.play); // (3b) No available moves - No winner

    if (game.board.indexOf(null) == -1) {
      display = document.getElementById('results');
      display.textContent = "No Winner!";
      /* alert("No winner"); */

      game.reset();
    } // (3c) Computers' move - Mark square with an 'X'
    // @TODO - Change to use not bad AI if you want
    else {
        move = game.dumbAI(); //move = game.notBadAI(); 

        game.board[move] = 1;
        var square = document.getElementById("tic_tac_toe_" + move);
        square.innerHTML = "X";
        square.classList.add("computer");
        square.removeEventListener("click", game.play);
      } // (3d) Who wins?


    win = null; // Horizontal row checks

    for (let i = 0; i < 9; i += 3) {
      if (game.board[i] != null && game.board[i + 1] != null && game.board[i + 2] != null) {
        if (game.board[i] == game.board[i + 1] && game.board[i + 1] == game.board[i + 2]) {
          win = game.board[i];
        }
      }

      if (win !== null) {
        break;
      }
    } // Vertical row checks


    if (win === null) {
      for (let i = 0; i < 3; i++) {
        if (game.board[i] != null && game.board[i + 3] != null && game.board[i + 6] != null) {
          if (game.board[i] == game.board[i + 3] && game.board[i + 3] == game.board[i + 6]) {
            win = game.board[i];
          }

          if (win !== null) {
            break;
          }
        }
      }
    } // Diagonal row checks


    if (win === null) {
      if (game.board[0] != null && game.board[4] != null && game.board[8] != null) {
        if (game.board[0] == game.board[4] && game.board[4] == game.board[8]) {
          win = game.board[4];
        }
      }
    }

    if (win === null) {
      if (game.board[2] != null && game.board[4] != null && game.board[6] != null) {
        if (game.board[2] == game.board[4] && game.board[4] == game.board[6]) {
          win = game.board[4];
        }
      }
    } // There is a winner


    if (win !== null) {
      display = document.getElementById('results');
      display.textContent = "Winner - " + (win == 0 ? "Player" : "Computer");
      /*       alert("Winner - " + (win==0 ? "Player" : "Computer"));*/

      game.reset();
    }
  },
  // (4) Dumb computer AI - Randomly choose an empty space
  dumbAI: function () {
    // (4a) Extract all open spaces
    var open = [];

    for (let i = 0; i < 9; i++) {
      if (game.board[i] === null) {
        open.push(i);
      }
    } // (4b) Rondomly choose an open space


    var random = Math.floor(Math.random() * (open.length - 1));
    return open[random];
  },
  // (5) AI with a little more intelligence
  notBadAI: function () {
    // (5a) Init
    var move = null;

    var check = function (first, direction, pc) {
      //Check(): Helper Function, check possible winning row
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

      if (game.board[first] == null && game.board[second] == pc && game.board[third] == pc) {
        return first;
      } else if (game.board[first] == pc && game.board[second] == null && game.board[third] == pc) {
        return second;
      } else if (game.board[first] == pc && game.board[second] == pc && game.board[third] == null) {
        return third;
      }

      return null;
    }; // (5b) Priority #1 - Go for the win
    // Check horizontal rows


    for (let i = 0; i < 9; i += 3) {
      move = check(i, "R", 1);

      if (move !== null) {
        break;
      }
    } // Check vertical columns


    if (move === null) {
      for (let i = 0; i < 3; i++) {
        move = check(i, "C", 1);

        if (move !== null) {
          break;
        }
      }
    } // Check diagonal


    if (move === null) {
      move = check(0, "D", 1);
    }

    if (move === null) {
      move = check(2, "D", 1);
    } // (5c) Priority #2 - Block human from winning
    // Check horizontal rows


    for (let i = 0; i < 9; i += 3) {
      move = check(i, "R", 0);

      if (move !== null) {
        break;
      }
    } // Check vertical columns


    if (move === null) {
      for (let i = 0; i < 3; i++) {
        move = check(i, "C", 0);

        if (move !== null) {
          break;
        }
      }
    } // Check diagonal


    if (move === null) {
      move = check(0, "D", 0);
    }

    if (move === null) {
      move = check(2, "D", 0);
    } // (5d) Random move if nothing


    if (move === null) {
      move = game.dumbAI();
    }

    return move;
  }
};
window.addEventListener("load", game.reset);

},{}]},{},[1]);
