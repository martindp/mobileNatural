appModule
    .factory('Consultas', function($resource) {
        return {
            guardarConsulta: function (descripcion) {
                return $resource('http://localhost:51297/api/Consultas/PostConsultas').save(descripcion);
            }
        }
    })