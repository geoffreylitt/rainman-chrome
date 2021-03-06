'use strict';

var rainmanApp = angular.module('rainmanApp', []);

var oldHTML = $("#hidden").text() // extract from the DOM where we stored it

// var apiURL = "http://0.0.0.0:5000/api/article";
var apiURL = "http://rainmanio.herokuapp.com/api/article"

rainmanApp.controller('RainmanCtrl', function RainmanCtrl($scope, $http, $sce, $timeout) {
  $http.defaults.useXDomain = true;
  delete $http.defaults.headers.common['X-Requested-With'];

  $scope.pageState = {
    loadState: "loading",
    contentLoaded: false,
    sidebarLoaded: false,
    loadStep: 0
  };

  var loadResults = function(){
    var pageURL = document.URL.split("?")[0];
    $http.post(apiURL, {content: oldHTML, url: pageURL}).
    success(function(data, status) {
      processResults(data);
      $scope.pageState.loadState = "success";
      $scope.pageState.contentLoaded = true;
      $scope.pageState.sidebarLoaded = true;
    }).
    error(function(data, status){
      $scope.pageState.loadState = "error";
    })
  };

  var processResults = function(data){
    $scope.article = $sce.trustAsHtml(data.content);
    $scope.cards = data.cards;

    for(var i = 0; i < $scope.cards.length; i++){
      $scope.cards[i].shortSummary = data.cards[i].summary.substring(0, 400) + "...";
      $scope.cards[i].summary = data.cards[i].summary.substring(0, 1000) + "...";
      $scope.cards[i].expanded = false;
      $scope.cards[i].htmlID = "card" + i;
    }
  }

  var incrementLoadStep = function(){
    $scope.pageState.loadStep += 1;
    console.log($scope.pageState.loadStep);
  }

  loadResults();
  $timeout(incrementLoadStep, 2000);
  $timeout(incrementLoadStep, 4000);

});

angular.bootstrap(document, ['rainmanApp']);
