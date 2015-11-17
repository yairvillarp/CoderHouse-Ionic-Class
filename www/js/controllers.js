angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, crudService, setHeader, url) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.imeisearch = {
    txt: '',
    search: function(txt){
      $ionicLoading.show({
        template: 'Loading...'
      });
      //setHeader.common['Key'] = 'value';
      crudService({
        method: 'GET',
        unique: true,
        url: url.getUrl()+'/sites/MLA/search?q='+txt+'&category=MLA1430',
      }).success(function (resp) {
        console.log(resp.results[0]);
        $scope.imeisearch.productos = resp.results;
        $ionicLoading.hide();
      }).error(function(resp, status, headers, config){
        console.log(status);
    });
    }
  };

  $scope.showTweet = false;
  $scope.showSubmenu = function(){
    $scope.showTweet = ($scope.showTweet) ? false : true;
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CategoriesCtrl', function($scope, $ionicLoading, crudService, setHeader, url) {
  $ionicLoading.show({
    template: 'Loading...'
  });

  crudService({
    method: 'GET',
    unique: true,
    url: url.getUrl()+'/sites/MLA/categories',
  }).success(function (resp) {
    $scope.playlists = resp;
    $ionicLoading.hide();
  });
})

.controller('CategoryCtrl', function($scope, $ionicLoading, $stateParams, crudService, setHeader, url) {
  $scope.cat = $stateParams.name;
  $scope.txt = '';
  $scope.search = function(txt){
    //setHeader.common['Key'] = 'value';
    crudService({
      method: 'GET',
      unique: true,
      url: url.getUrl()+'/sites/MLA/search?q='+txt+'&category='+$stateParams.categoryId,
    }).success(function (resp) {
      $scope.products = resp.results;
    });
  }
  $ionicLoading.show({
    template: 'Loading...'
  });
  crudService({
    method: 'GET',
    unique: true,
    url: url.getUrl()+'/sites/MLA/search?category='+$stateParams.categoryId,
  }).success(function (resp) {
    $scope.products = resp.results;
    $ionicLoading.hide();
  });
});
