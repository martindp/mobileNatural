appModule
    .controller('ProductoCtrl', function($scope, $http, Productos, Consultas, $stateParams, $resource, $localstorage) {
        $scope.producto = Productos.obtenerProductoPorId($stateParams.productoId);

        $scope.descripcion = true;
        $scope.comentarios = false;
        $scope.consultas = false;
        $scope.mostrarDescripcion = function () {
            $scope.descripcion = true;
            $scope.comentarios = false;
            $scope.consultas = false;
        };
        $scope.mostrarComentarios = function () {
            $scope.descripcion = false;
            $scope.comentarios = true;
            $scope.consultas = false;
        };
        $scope.mostrarConsultas = function () {
            $scope.descripcion = false;
            $scope.comentarios = false;
            $scope.consultas = true;
        };

        $scope.nuevaConsulta = false;
        $scope.consulta = { Descripcion: '' };
        $scope.crearConsulta = function () {
            $scope.nuevaConsulta = true;
        };
        $scope.guardarConsulta = function (productoId, descripcion) {
            //Consultas.guardarConsulta(descripcion).$promise.then(
            //    function () {
            //        $scope.nuevaConsulta = false;
            //        //actualizar consultas
            //        $scope.consulta = { Descripcion: '' };
            //    },
            //    function (response) { $scope.errors = response.data; });
            $http({ method: 'POST', isArray: false, url: 'http://localhost:51297/api/Consultas/PostConsultas', params: { productoId: productoId, descripcion: descripcion } }).then(
                function () {
                    $scope.nuevaConsulta = false;
                    $scope.consulta = { Descripcion: '' };
                    //Actualizo
                    $scope.producto = Productos.obtenerProductoPorId($stateParams.productoId);
                });
        };
        $scope.cancelarConsulta = function (){
            $scope.nuevaConsulta = false;
            $scope.consulta = { Descripcion: '' };
        };

        $scope.agregarAlCarrito = function(productoId){
            $resource('http://localhost:51297/api/Productos/'+productoId).get(function(response){
                var producto = response;

                var pedidos = $localstorage.getObject('Pedido');
                if (pedidos == null || !(pedidos.length > 0))
                {
                    pedidos = [
                        {
                            productoId: productoId,
                            cantidadPedido: producto.Cantidad,
                            imagenProducto: producto.ImagenProducto,
                            nombre: producto.Nombre,
                            nombreProductor: producto.NombreProductor,
                            precio: producto.Precio,
                            unidad: producto.Unidad,
                            cantidad: producto.Cantidad
                        }
                    ];
                }
                else{
                    var encontrado = false;
                    for(var i = 0; i < pedidos.length; i++){
                        if(pedidos[i].productoId == productoId){
                            encontrado = true;
                            pedidos[i].cantidadPedido = pedidos[i].cantidadPedido + producto.Cantidad;
                        }
                    }
                    if(!encontrado){
                        pedidos.push({
                            productoId: productoId,
                            cantidadPedido: producto.Cantidad,
                            imagenProducto: producto.ImagenProducto,
                            nombre: producto.Nombre,
                            nombreProductor: producto.NombreProductor,
                            precio: producto.Precio,
                            unidad: producto.Unidad,
                            cantidad: producto.Cantidad
                        });
                    }
                }

                $localstorage.setObject('Pedido', pedidos);

                $("#totalPedidos").html(pedidos.length);
            });
        }
    });