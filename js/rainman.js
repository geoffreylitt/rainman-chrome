'use strict';

var rainmanApp = angular.module('rainmanApp', []);

var oldHTML = $("#hidden").text() // extract from the DOM where we stored it

// var apiURL = "http://0.0.0.0:5000/api";
var apiURL = "http://rainmanio.herokuapp.com/api"

rainmanApp.controller('RainmanCtrl', function RainmanCtrl($scope, $http, $sce) {
  $http.defaults.useXDomain = true;
  delete $http.defaults.headers.common['X-Requested-With'];

  $scope.pageState = {loadState: "loading"};

  var loadResults = function(){
    var pageURL = document.URL.split("?")[0];
    $http.post(apiURL, {content: oldHTML, url: pageURL}).
    success(function(data, status) {
      processResults(data);
      $scope.pageState.loadState = "success";
    }).
    error(function(data, status){
      $scope.pageState.loadState = "error";
    })
  };

  var processResults = function(data){
    $scope.article = $sce.trustAsHtml(data.content);
    $scope.cards = data.cards;

    for(var i = 0; i < $scope.cards.length; i++){
      $scope.cards[i].shortSummary = data.cards[i].summary.substring(0, 500) + "...";
      $scope.cards[i].expanded = false;
    }

  }

  loadResults();

});

angular.bootstrap(document, ['rainmanApp']);