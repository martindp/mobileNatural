appModule
    .factory('Productos', function($resource) {
        return {
            obtenerProductoPorId: function (id) {
                return $resource('http://localhost:51297/api/Productos/'+id).get();
            }
        }
    })