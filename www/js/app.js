// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in app-controller.js
var appModule = angular.module('starter', ['ionic', 'ionic.utils', 'ngResource', 'ui.bootstrap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //if (window.cordova && window.cordova.plugins.Keyboard) {
    //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //}
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.productores', {
    url: "/productores",
    views: {
      'menuContent': {
        templateUrl: "templates/productores.html",
        controller: 'ProductoresCtrl'
      }
    }
  })
      .state('app.bienvenida', {
        url: "/bienvenida",
        views: {
          'menuContent': {
            templateUrl: "templates/bienvenida.html"
            //controller: 'BienvenidaCtrl'
          }
        }
      })

      .state('app.acercaDe', {
          url: "/acercaDe",
          views: {
              'menuContent': {
                  templateUrl: "templates/acercaDe.html"
                  //controller: 'BienvenidaCtrl'
              }
          }
      })

      .state('app.productor', {
        url: "/productores/:productorId",
        views: {
          'menuContent': {
            templateUrl: "templates/productor.html",
            controller: 'ProductorCtrl'
          }
        }
      })

      .state('app.productosProductor', {
        url: "/productosProductor/:productorId",
        views: {
          'menuContent': {
            templateUrl: "templates/productosProductor.html",
            controller: 'ProductorCtrl'
          }
        }
      })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.categorias', {
      url: "/categorias",
      views: {
        'menuContent': {
          templateUrl: "templates/principal.html",
          controller: 'CategoriasCtrl'
        }
      }
    })

  .state('app.categoria', {
    url: "/categorias/:categoriaId",
    views: {
      'menuContent': {
        templateUrl: "templates/categoria.html",
        controller: 'CategoriaCtrl'
      }
    }
  })

  .state('app.producto', {
    url: "/productos/:productoId",
    views: {
      'menuContent': {
        templateUrl: "templates/producto.html",
        controller: 'ProductoCtrl'
      }
    }
  })

      .state('app.pedido', {
        url: "/pedido",
        views: {
          'menuContent': {
            templateUrl: "templates/pedido.html",
            controller: 'PedidoCtrl'
          }
        }
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/categorias');
});
