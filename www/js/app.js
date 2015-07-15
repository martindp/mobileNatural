// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in app-controller.js
var appModule = angular.module('starter', ['ionic', 'ionic.utils', 'ngResource', 'ui.bootstrap'])


    .run(function($ionicPlatform,$rootScope,$localstorage) {
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
            var authData = $localstorage.get('authorizationData');
            $rootScope.currentUser = authData.token;
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                // get me a login modal!
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            //Vistas de login

            .state('app.bienvenida', {
                url: "/bienvenida",
                views: {
                    'menuContent': {
                        templateUrl: "templates/bienvenida.html"
                       // controller: 'loginController'
                    }
                },
                data: {
                    requireLogin: false
                }

            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: 'loginController'
                    }
                },
                data: {
                    requireLogin: false
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
                },
                data: {
                    requireLogin: true
                }
            })

            .state('app.productor', {
                url: "/productores/:productorId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/productor.html",
                        controller: 'ProductorCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

            .state('app.productosProductor', {
                url: "/productosProductor/:productorId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/productosProductor.html",
                        controller: 'ProductorCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('app.categorias', {
                url: "/categorias",
                views: {
                    'menuContent': {
                        templateUrl: "templates/principal.html",
                        controller: 'CategoriasCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

            .state('app.categoria', {
                url: "/categorias/:categoriaId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/categoria.html",
                        controller: 'CategoriaCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('app.producto', {
                url: "/productos/:productoId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/producto.html",
                        controller: 'ProductoCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('app.pedido', {
                url: "/pedido",
                views: {
                    'menuContent': {
                        templateUrl: "templates/pedido.html",
                        controller: 'PedidoCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('app.pedidos', {
                url: "/pedidos",
                views: {
                    'menuContent': {
                        templateUrl: "templates/historicoPedidos.html",
                        controller: 'PedidosCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('app.comentarios', {
                url: "/pedidos/:pedidoId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/comentarioPedido.html",
                        controller: 'ComentariosCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('app.comentariosDisplay', {
                url: "/pedidosD/:pedidoId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/comentarioPedidoDisplay.html",
                        controller: 'ComentariosCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/bienvenida');
    });

//apiUrl = 'http://quieronaturalmobile.azurewebsites.net';
apiUrl = 'http://localhost:60000'