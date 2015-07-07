appModule
    .factory('Productos', function($resource) {
        return {
            obtenerProductoPorId: function (id) {
                return $resource(apiUrl+'/api/Productos/'+id).get();
            }
        }
    })