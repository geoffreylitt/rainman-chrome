'use strict';

var rainmanApp = angular.module('rainmanApp', []);

var ENDPOINT = "http://rainmanio.herokuapp.com/api";

var oldHTML = "<html></html>"; // extract from stored old html place

rainmanApp.controller('RainmanCtrl', function RainmanCtrl($scope, $http) {
  $scope.pageState = {loadState: "loading"};

  var loadResults = function(){
    $http.post(ENDPOINT, {html: oldHTML}).
    success(function(data, status) {
      processResults(data);
      $scope.pageState.loadState = "success";
    }).
    error(function(data, status){
      $scope.pageState.loadState = "error";
    })
  };

  var processResults = function(data){
    $("#content").innerHTML = data.content;
  }

  loadResults();

});

angular.bootstrap(document, ['rainmanApp']);