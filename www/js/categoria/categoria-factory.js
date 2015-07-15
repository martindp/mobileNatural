appModule
    .factory('Categorias', function($http,$q,$localstorage,$resource) {
        return {
            obtenerCategorias: function () {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Categorias',null,{ 'query': {method:'GET' ,isArray:true ,headers: { 'Authorization': data } }}).query();

            },
            obtenerCategoriaPorId: function (idCategoria) {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Categorias',{id:idCategoria},{ 'query': {method:'GET' ,headers: { 'Authorization': data } }}).query();
            }
        }
    })