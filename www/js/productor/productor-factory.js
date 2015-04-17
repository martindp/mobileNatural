appModule
    .factory('Productores', function($resource) {
      return {
          obtenerProductores: function(){
              return $resource('http://localhost:51297/api/Productores').query();
          },
          obtenerProductorPorId: function(id){
              return $resource('http://localhost:51297/api/Productores/'+id).get();
          }
      }
    })