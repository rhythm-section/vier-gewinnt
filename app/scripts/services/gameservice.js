'use strict';

angular.module('vierGewinntApp')
  .factory('gameService', function () {
    
    /* Initial Setting of Needed Variables */
    var boardSize = 8;                                  /* Setting the size of the quadratic board */
    var gameBoard = [];                                 /* Setting the gameBoard Array which states the field states */
    var currentUser = 0;                                /* Setting the currentUser variable */
    var gameRunning = false;                            /* Setting the gameRunning variable */
    var overlayText = '';                               /* Setting the overlayText variable which shows the winner or draw message */
    
    /* Initial Sound variables */
    var winSound;
    var drawSound;
    var colSounds = [];

    /* The init-Function sets all variables for starting the game */
    var initGame = function () {
      currentUser = 1;                                  /* set the currentUser to the startingUser */
      gameRunning = true;                               /* define the game as running */
      overlayText = '';

      /* Intialize the gameBoard with boardSize*boardSize fields and each field has userValue 0 */
      for(var i = 0; i < boardSize; i++) {
        gameBoard[i] = new Array(boardSize);
        for(var j = 0; j < boardSize; j++) {
          gameBoard[i][j] = 0;
        }
      }
    };

    /* The initSound-Function is responsible for creating the audio elements in the DOM */
    var initSound = function () {
      winSound = new Audio('/sounds/winsound.mp3');             /* Initialize the winSound-Variable ... */
      document.body.appendChild(winSound);                      /* ... and append it to the DOM */

      drawSound = new Audio('/sounds/yay.mp3');                 /* Initialize the drawSound-Variable ... */
      document.body.appendChild(drawSound);                     /* ... and append it to the DOM */

      /* and the same for all eight piano sounds */
      for(var i = 0; i < 8; i++) {
        colSounds[i] = new Audio('/sounds/col' + i + '.mp3');
        document.body.appendChild(colSounds[i]);
      }
    };

    /* The inserCoin-Function will be called when a new coin is set from a user */
    var insertCoin = function (colNumber) {

      for(var rowNumber = boardSize-1; rowNumber >= 0; rowNumber--) {
        if(gameBoard[colNumber][rowNumber] === 0) {
          gameBoard[colNumber][rowNumber] = currentUser;
          connectFour(colNumber, rowNumber);
          break;
        }
      }

    };

    var changeUser = function () {
      currentUser = (currentUser === 1) ? 2 : 1;
    };

    var getHorizontalCount = function(colNumber, rowNumber) {
      var coinCnt = 1;

      // horizontal left
      for(var leftColNumber = colNumber-1; leftColNumber >= 0; leftColNumber--) {
        if(gameBoard[leftColNumber][rowNumber] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      // horizontal right
      for(var rightColNumber = colNumber+1; rightColNumber < boardSize; rightColNumber++) {
        if(gameBoard[rightColNumber][rowNumber] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      return coinCnt;
    };

    var getVerticalCount = function(colNumber, rowNumber) {
      var coinCnt = 1;

      // vertical up
      for(var upRowNumber = rowNumber-1; upRowNumber >= 0; upRowNumber--) {
        if(gameBoard[colNumber][upRowNumber] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      // vertical down
      for(var downRowNumber = rowNumber+1; downRowNumber < boardSize; downRowNumber++) {
        if(gameBoard[colNumber][downRowNumber] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      return coinCnt;
    };

    var getDiagonalUpLeft = function(colNumber, rowNumber) {
      var coinCnt = 1;
      var upCol = colNumber;
      var upRow = rowNumber;
      var downCol = colNumber;
      var downRow = rowNumber;

      // diagonal up lef
      while(upCol > 0 && upRow > 0) {
        upCol--;
        upRow--;

        if(gameBoard[upCol][upRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      // diagonal down right
      while(downCol < boardSize-1 && downRow < boardSize-1) {
        downCol++;
        downRow++;

        if(gameBoard[downCol][downRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      return coinCnt;
    };

    var getDiagonalUpRight = function(colNumber, rowNumber) {
      var coinCnt = 1;
      var upCol = colNumber;
      var upRow = rowNumber;
      var downCol = colNumber;
      var downRow = rowNumber;

      // diagonal up right
      while(upCol < boardSize-1 && upRow > 0) {
        upCol++;
        upRow--;

        if(gameBoard[upCol][upRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      // diagonal down left
      while(downCol > 0 && downRow < boardSize-1) {
        downCol--;
        downRow++;

        if(gameBoard[downCol][downRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

      return coinCnt;
    };

    var connectFour = function(colNumber, rowNumber) {
      var maxVertical =  getVerticalCount(colNumber, rowNumber);
      var maxHorizontal = getHorizontalCount(colNumber, rowNumber);
      var maxUpLeft = getDiagonalUpLeft(colNumber, rowNumber);
      var maxUpRight = getDiagonalUpRight(colNumber, rowNumber);

      if(maxVertical >= 4 || maxHorizontal >= 4 || maxUpLeft >= 4 || maxUpRight >= 4) {
        finishGame('win');
      } else if(!emptyFields()) {
        finishGame('draw');
      } else {
        colSounds[colNumber].cloneNode().play();
        changeUser();
      }

    };

    var emptyFields = function() {
      for(var i = 0; i < boardSize; i++) {
        for(var j = 0; j < boardSize; j++) {
          if(gameBoard[i][j] === 0) {
            return true;
          }
        }
      }

      return false;
    };

    var finishGame = function(result) {
      gameRunning = false;
      if(result === 'win') {
        winSound.play();
        overlayText = 'Winner, winner, chicken dinner! Player ' + currentUser + ' wins!';
      } else if (result === 'draw') {
        drawSound.play();
        overlayText = 'Everybody wins!';
      }
    };

    initGame();
    initSound();

    return {
      /**
      * Insert a coin into gameBoard
      * @param colNumber
      */
      insertCoin: function (colNumber) {
        insertCoin(colNumber);
      },
      /**
      * Starts a new game
      */
      initGame: function () {
        initGame();
      },
      /**
      * Get game running state
      * @returns boolean
      */
      getGameRunning: function () {
        return gameRunning;
      },
      /**
      * Get game board
      * @returns {array}
      */
      getGameBoard: function () {
        return gameBoard;
      },
      /**
      * Get current user
      * @returns integer
      */
      getCurrentUser: function () {
        return currentUser;
      },
      /**
      * Get overlay text
      * @returns string
      */
      getOverlayText: function() {
        return overlayText;
      }
    };
  });
