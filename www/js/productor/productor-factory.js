appModule
    .factory('Productores', function($resource) {
      return {
          obtenerProductores: function(){
              return $resource(apiUrl+'/api/Productores').query();
          },
          obtenerProductorPorId: function(id){
              return $resource(apiUrl+'/api/Productores/'+id).get();
          },

          guardarConsulta: function (descripcion) {
              return $resource(apiUrl+'/api/ConsultasProductor/PostConsultas').save(descripcion);
          }

      }
    })