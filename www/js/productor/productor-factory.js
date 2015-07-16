appModule
    .factory('Productores', function($resource,$localstorage) {
      return {
          obtenerProductores: function(){
              var authData = $localstorage.getObject('authorizationData');
              var data = "Bearer "+authData.token;
              return $resource(apiUrl+'/api/Productores',null,{ 'query': {method:'GET' ,isArray:true,headers: { 'Authorization': data } }}).query();
          },
          obtenerProductorPorId: function(idProductor){
              var authData = $localstorage.getObject('authorizationData');
              var data = "Bearer "+authData.token;
              return $resource(apiUrl+'/api/Productores',{id:idProductor},{ 'query': {method:'GET' ,headers: { 'Authorization': data } }}).query();
          },

          guardarConsulta: function (descripcion) {
              return $resource(apiUrl+'/api/ConsultasProductor/PostConsultas').save(descripcion);
          }

      }
    })