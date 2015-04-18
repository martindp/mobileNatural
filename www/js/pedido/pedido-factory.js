appModule
    .factory('Pedidos', function($resource) {
        return {
            obtenerPedidos: function () {
                return $resource('http://localhost:51297/api/Pedidos').query();
            }

        }
    })