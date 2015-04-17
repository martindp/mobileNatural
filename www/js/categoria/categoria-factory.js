appModule
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