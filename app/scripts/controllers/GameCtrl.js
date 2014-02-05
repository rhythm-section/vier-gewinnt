'use strict';

angular.module('vierGewinntApp')
  .controller('gameCtrl', function ($scope, gameService) {
    $scope.gameBoard = gameService.getGameBoard();
    $scope.currentUser = gameService.getCurrentUser();
    $scope.overlayText = gameService.getOverlayText();
    $scope.isFinished = false;

    $scope.insertCoin = function (row) {
      if(gameService.getGameRunning()) {
        gameService.insertCoin(row);
        $scope.currentUser = gameService.getCurrentUser();
      }

      if(!gameService.getGameRunning()) {
        $scope.overlayText = gameService.getOverlayText();
        $scope.isFinished = true;
      }
    };

    $scope.initGame = function () {
      gameService.initGame();
      $scope.gameBoard = gameService.getGameBoard();
      $scope.isFinished = false;
      $scope.currentUser = gameService.getCurrentUser();
    };
  });
