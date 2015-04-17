angular.module('starter.controllers', ['ionic','ngResource'])
    .factory('Categorias', function($resource) {
        return {
            obtenerCategorias: function () {
                return $resource('http://localhost:51297/api/Categorias').query();
            },
            obtenerCategoriaPorId: function (id) {
                return $resource('http://localhost:51297/api/Categorias/'+id).get();
            }
        }
    })

    .factory('Consultas', function($resource) {
        return {
            guardarConsulta: function (descripcion) {
                return $resource('http://localhost:51297/api/Consultas/PostConsultas').save(descripcion);
            }
        }
    })

    .factory('Productos', function($resource) {
        return {
            obtenerProductoPorId: function (id) {
                return $resource('http://localhost:51297/api/Productos/'+id).get();
            }
        }
    })
    .factory('Productores', function($resource) {
      return {
          obtenerProductores: function(){
              return $resource('http://localhost:51297/api/Productores').query();
          },
          obtenerProductorPorId: function(id){
              return $resource('http://localhost:51297/api/Productores/'+id).get();
          }
      }
    })

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

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
    .controller('ProductoresCtrl', function($scope, Productores) {
        $scope.productores = Productores.obtenerProductores();
    })

    .controller('ProductorCtrl', function($scope, $stateParams, Productores) {
        $scope.productor = Productores.obtenerProductorPorId($stateParams.productorId)
    })
.controller('CategoriasCtrl', function($scope, Categorias) {
  $scope.categorias = Categorias.obtenerCategorias();
})

    .controller('CategoriasCtrl', function($scope, Categorias) {
        $scope.categorias = Categorias.obtenerCategorias();
    })

    .controller('CategoriaCtrl', function($scope, Categorias, $stateParams) {
        $scope.categoria = Categorias.obtenerCategoriaPorId($stateParams.categoriaId);
    })

    .controller('ProductoCtrl', function($scope, $http, Productos, Consultas, $stateParams) {
        $scope.producto = Productos.obtenerProductoPorId($stateParams.productoId);

        $scope.descripcion = true;
        $scope.comentarios = false;
        $scope.consultas = false;
        $scope.mostrarDescripcion = function () {
            $scope.descripcion = true;
            $scope.comentarios = false;
            $scope.consultas = false;
        };
        $scope.mostrarComentarios = function () {
            $scope.descripcion = false;
            $scope.comentarios = true;
            $scope.consultas = false;
        };
        $scope.mostrarConsultas = function () {
            $scope.descripcion = false;
            $scope.comentarios = false;
            $scope.consultas = true;
        };

        $scope.nuevaConsulta = false;
        $scope.consulta = { Descripcion: '' };
        $scope.crearConsulta = function () {
            $scope.nuevaConsulta = true;
        };
        $scope.guardarConsulta = function (productoId, descripcion) {
            //Consultas.guardarConsulta(descripcion).$promise.then(
            //    function () {
            //        $scope.nuevaConsulta = false;
            //        //actualizar consultas
            //        $scope.consulta = { Descripcion: '' };
            //    },
            //    function (response) { $scope.errors = response.data; });
            $http({ method: 'POST', isArray: false, url: 'http://localhost:51297/api/Consultas/PostConsultas', params: { productoId: productoId, descripcion: descripcion } }).then(
                function () {
                    $scope.nuevaConsulta = false;
                    $scope.consulta = { Descripcion: '' };
                    //Actualizo
                    $scope.producto = Productos.obtenerProductoPorId($stateParams.productoId);
                });
        };
        $scope.cancelarConsulta = function (){
            $scope.nuevaConsulta = false;
            $scope.consulta = { Descripcion: '' };
        };
    });