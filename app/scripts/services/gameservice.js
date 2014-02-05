'use strict';

angular.module('vierGewinntApp')
  .factory('gameService', function () {
    var boardSize = 8;
    var gameBoard = [];
    var currentUser = 1;
    var gameRunning = false;
    var winSound;
    var insertSound;

    var init = function () {
      currentUser = 1;
      gameRunning = true;
      winSound = new Audio("/sounds/fail1.m4a");
      insertSound = new Audio("/sounds/Tap.wav");
      for(var i = 0; i < boardSize; i++) {
        gameBoard[i] = new Array(boardSize);
        for(var j = 0; j < boardSize; j++) {
          gameBoard[i][j] = 0;
        }
      }
    };

    var insertCoin = function (colNumber) {
      // check if colNumber < boardSize => isValid
      for(var rowNumber = 7; rowNumber >= 0; rowNumber--) {
        if(gameBoard[colNumber][rowNumber] === 0) {
        	insertSound.cloneNode().play();
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
          //console.log('left / ' + 'colNumber: ' + leftColNumber + ' / rowNumber: ' + rowNumber + 'coinCnt: ' + coinCnt);
        }
      }

      // horizontal right
      for(var rightColNumber = colNumber+1; rightColNumber < boardSize; rightColNumber++) {
        if(gameBoard[rightColNumber][rowNumber] !== currentUser) {
          break;
        } else {
          coinCnt++;
          //console.log('right / ' + 'colNumber: ' + rightColNumber + ' / rowNumber: ' + rowNumber + 'coinCnt: ' + coinCnt);
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
          // console.log('up / ' + 'rowNumber: ' + upRowNumber + ' / colNumber: ' + colNumber + ' coinCnt: ' + coinCnt);
        }
      }

      // vertical down
      for(var downRowNumber = rowNumber+1; downRowNumber < boardSize; downRowNumber++) {
        if(gameBoard[colNumber][downRowNumber] !== currentUser) {
          break;
        } else {
          coinCnt++;
          // console.log('down / ' + 'rowNumber: ' + upRowNumber + ' / colNumber: ' + colNumber + ' coinCnt: ' + coinCnt);
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

      while(upCol > 0 && upRow > 0) {
        upCol--;
        upRow--;

        if(gameBoard[upCol][upRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
        }
      }

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

      while(upCol < boardSize-1 && upRow > 0) {
        upCol++;
        upRow--;

        if(gameBoard[upCol][upRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
          // console.log('down / ' + 'rowNumber: ' + upRowNumber + ' / colNumber: ' + colNumber + ' coinCnt: ' + coinCnt);
        }
      }

      while(downCol > 0 && downRow < boardSize-1) {
        downCol--;
        downRow++;

        if(gameBoard[downCol][downRow] !== currentUser) {
          break;
        } else {
          coinCnt++;
          // console.log('down / ' + 'rowNumber: ' + upRowNumber + ' / colNumber: ' + colNumber + ' coinCnt: ' + coinCnt);
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
        finishGame();
      } else {
        changeUser();
      }

      //console.log('maxVertical: ' + maxVertical + ' / maxHorizontal: ' + maxHorizontal + ' / maxUpLeft: ' + maxUpLeft + ' / maxUpRight: ' + maxUpRight);
    };

    var finishGame = function() {
      // show winner, winner, chicken dinner message
      gameRunning = false;
      winSound.play();
      console.log('Player ' + currentUser + ' wins!');
    };

    init();

    return {
      initGame: function () {
        init();
        return gameBoard;
      },
      insertCoin: function (colNumber) {
        insertCoin(colNumber);
      },
      getGameRunning: function () {
        return gameRunning;
      },
      getGameBoard: function () {
        return gameBoard;
      },
      getCurrentUser: function () {
        return currentUser;
      },
      playHoverSound: function(){
      	playHoverSound();
      }
    };
  });
  
  
  var playHoverSound = function() {
  	insertSound.cloneNode().play();
  };
