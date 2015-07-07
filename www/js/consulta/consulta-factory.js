appModule
    .factory('Consultas', function($resource) {
        return {
            guardarConsulta: function (descripcion) {
                return $resource(apiUrl+'/api/Consultas/PostConsultas').save(descripcion);
            }
        }
    })