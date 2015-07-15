appModule
    .factory('Productos', function($resource,$localstorage) {
        return {
            obtenerProductoPorId: function (idProducto) {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Productos',{id:idProducto},{ 'query': {method:'GET' ,headers: { 'Authorization': data } }}).query();
            }
        }
    })