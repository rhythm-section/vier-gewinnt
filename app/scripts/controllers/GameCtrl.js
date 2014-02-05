'use strict';

angular.module('vierGewinntApp')
  .controller('gameCtrl', function ($scope, gameService) {
    $scope.initGame = gameService.initGame();
    $scope.gameBoard = gameService.getGameBoard();
    $scope.currentUser = gameService.getCurrentUser();
    $scope.isFinished = false;

    $scope.insertCoin = function (row) {
      if(gameService.getGameRunning()) {
        gameService.insertCoin(row);
        $scope.currentUser = gameService.getCurrentUser();
      }

      if(!gameService.getGameRunning()) {
        $scope.isFinished = true;
      }
    };

    $scope.initGame = function () {
      $scope.gameBoard = gameService.initGame();
      $scope.isFinished = false;
    };
  });
