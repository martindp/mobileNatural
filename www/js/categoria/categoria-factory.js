appModule
    .factory('Categorias', function($resource) {
        return {
            obtenerCategorias: function () {
                return $resource(apiUrl+'/api/Categorias').query();
            },
            obtenerCategoriaPorId: function (id) {
                return $resource(apiUrl+'/api/Categorias/'+id).get();
            }
        }
    })