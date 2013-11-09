'use strict';

var rainmanApp = angular.module('rainmanApp', []);

rainmanApp.controller('RainmanCtrl', function RainmanCtrl($scope) {
  $scope.data = {message: "test"};
});

angular.bootstrap(document, ['rainmanApp']);