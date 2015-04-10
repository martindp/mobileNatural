angular.module('starter.controllers', ['ionic','ngResource'])

.factory('Categorias', function($resource) {
  return $resource('http://localhost:51297/api/Categorias:id');
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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

.controller('CategoriasCtrl', function($scope, Categorias) {
  $scope.categorias = Categorias.query();
})

.controller('CategoriaCtrl', function($scope, $stateParams, Categorias, $resource) {
  $scope.categoria = $resource('http://localhost:51297/api/Categorias/'+ $stateParams.categoriaId).get();
});
